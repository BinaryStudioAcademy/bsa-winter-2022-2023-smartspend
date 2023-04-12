import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { type Range } from 'react-date-range';
import { Link } from 'react-router-dom';
import {
    type TransactionGetAllItemResponseDto,
    type WalletGetAllItemResponseDto,
} from 'shared/build';

import DashboardPlaceholder from '~/assets/img/dashboard-placeholder.png';
import {
    Button,
    Calendar,
    CardTotal,
    Chart,
    DoughnutChart,
    Dropdown,
    Input,
    LineChart,
    NewWalletModal,
    Placeholder,
    RangeSlider,
    WalletCard,
} from '~/bundles/common/components/components.js';
import {
    AppDocumentTitles,
    ButtonVariant,
    CardVariant,
    FaIcons,
} from '~/bundles/common/enums/enums.js';
import {
    findCurrencyById,
    formatRangeGraph,
    getInitialRange,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppDocumentTitle,
    useAppForm,
    useAppSelector,
} from '~/bundles/common/hooks/hooks.js';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';
import { actions as transactionsActions } from '~/bundles/common/stores/transactions';
import { type DataType } from '~/bundles/common/types/types.js';
import { WalletCardSize } from '~/bundles/landing/enums/enums.js';
import { actions as walletsActions } from '~/bundles/wallets/store';

import { type TransactionType } from '../../components/transanction-table/types';
import {
    calculateLineChartData,
    calculateWalletBalances,
    createCategoryDataArray,
    createWalletCategoryDataArray,
    filterCategories,
    filterChart,
    filterLineChart,
    getTotalPeriodAmount,
    getTotalTransactionSum,
    groupTransactionsByDate,
    processTransactions,
} from './helpers/helpers';
import styles from './styles.module.scss';

type FormValues = {
    name: string;
    category: string;
    wallet: string;
};

interface Filters {
    value: string;
    name: string;
}

type ChartBoxProperties = {
    children: JSX.Element | JSX.Element[] | string;
    title: string;
    date: string;
    controls?: JSX.Element | JSX.Element[] | string;
    transactions?: TransactionType[] | undefined;
};

const ChartBox = ({
    children,
    title,
    date,
    controls,
    transactions = [],
}: ChartBoxProperties): JSX.Element => {
    const transactionsByCategory: Record<
        string,
        { total: number; transactions: TransactionType[] }
    > = {};
    for (const transaction of transactions) {
        const categoryName = transaction.category.name;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!transactionsByCategory[categoryName]) {
            transactionsByCategory[categoryName] = {
                total: 0,
                transactions: [],
            };
        }
        transactionsByCategory[categoryName].total += transaction.amount;
        transactionsByCategory[categoryName].transactions.push(transaction);
    }
    return (
        <div className={classNames(styles.chart)}>
            <div className={styles.totals}>
                <div>
                    <h3 className={styles.chartTitle}>{title}</h3>
                    <span className={styles.chartDate}>{date}</span>
                </div>
                {controls && <div>{controls}</div>}
            </div>
            <div className={styles.chartBox}>{children}</div>
            <div className={styles.transactions}>
                {Object.values(transactionsByCategory).map((transaction) => {
                    return (
                        <div
                            key={transaction.transactions[0].id}
                            className={styles.transactionBody}
                        >
                            {transaction.transactions[0] && (
                                <div
                                    className={classNames(
                                        styles.columns,
                                        styles.leftColumn,
                                    )}
                                >
                                    <div
                                        style={{
                                            background: `${transaction.transactions[0].category.color}`,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            height: '25px',
                                            minWidth: '25px',
                                            borderRadius: '6px',
                                            color: '#fff',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                transaction.transactions[0]
                                                    .category.icon as IconProp
                                            }
                                        />
                                    </div>
                                    <div className={styles.transactionName}>
                                        {
                                            transaction.transactions[0].category
                                                .name
                                        }
                                    </div>
                                </div>
                            )}

                            <div className={styles.inDays}>
                                {transaction.transactions.length} transaction(s)
                            </div>

                            <div
                                className={classNames(
                                    styles.columns,
                                    styles.rightColumn,
                                    transaction.transactions[0].amount < 0
                                        ? styles.minus
                                        : styles.plus,
                                )}
                            >
                                {transaction.total.toFixed(2)}
                                {transaction.transactions[0].currency}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface WalletButtonProperties {
    children: JSX.Element | string;
    isButton?: boolean;
    onClick?: () => void;
}

const WalletButton: React.FC<WalletButtonProperties> = ({
    children,
    isButton = true,
    onClick,
}) => {
    return (
        <div onClickCapture={onClick} className={styles.walletButton}>
            {isButton && (
                <Button variant={ButtonVariant.PLAIN}>
                    <span className={styles.walletIcon}>
                        <FontAwesomeIcon
                            icon={FaIcons.PLUS}
                            color={'var(--color-white-100)'}
                        />
                    </span>
                </Button>
            )}
            {children}
        </div>
    );
};

// const tabsDashboard = [
//     { title: 'Days', isActive: true, disabled: false },
//     { title: 'Week', isActive: false, disabled: false },
//     { title: 'Months', isActive: false, disabled: true },
// ];

interface TransactionFilter {
    walletName?: string;
    categoryName?: string;
    amountRange?: { min: number; max: number };
    note?: string;
}

const Dashboard: React.FC = () => {
    useAppDocumentTitle(AppDocumentTitles.DASHBOARD);
    const dispatch = useAppDispatch();
    const [active, setActive] = useState(false);
    const { wallets } = useAppSelector((state) => state.wallets);
    const { currencies } = useAppSelector((state) => state.currencies);

    const { user } = useAppSelector((state) => state.users);
    const matchingCurrency = currencies.find(
        (currency) => currency.shortName === user?.currency,
    );

    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items ?? [],
    );

    const categories = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );

    const { control, errors } = useAppForm<FormValues>({
        defaultValues: { name: '', category: '', wallet: '' },
    });

    // const [firstTabs, setFirstTabs] = useButtonTabsState(tabsDashboard);
    // const [secondTabs, setSecondTabs] = useButtonTabsState(tabsDashboard);

    const [day, setDay] = useState<Range>(getInitialRange());

    const handleSelectDay = useCallback((day: Range): void => {
        setDay(day);
    }, []);

    const handleSliderChange = useCallback(
        (range: { min: number; max: number }): void => {
            setCurrentRange(range);
        },
        [],
    );

    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);

    useEffect(() => {
        void dispatch(walletsActions.loadAll());
        void dispatch(transactionsActions.loadTransactions());
        void dispatch(categoriesActions.loadCategories());
    }, [dispatch]);

    const [wallet, setWallet] = useState<DataType>();
    const [currentWallet, setCurrentWallet] =
        useState<WalletGetAllItemResponseDto>();

    const handleDropdownByWallets = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setWallet(selectedOption);
                setCurrentWallet(
                    wallets.find(
                        (wallet) => wallet.name === selectedOption.value,
                    ),
                );
            }
        },
        [wallets],
    );

    const [category, setCategory] = useState<DataType>();

    const handleDropdownByCategory = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setCategory(selectedOption);
            }
        },
        [],
    );

    const [filters, setFilters] = useState<Filters>({ value: '', name: '' });

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target as HTMLInputElement;
            setFilters((previousFilters) => ({
                ...previousFilters,
                [name]: value,
            }));
        },
        [],
    );

    const [transactionsData, setTransactionsData] = useState<
        TransactionGetAllItemResponseDto[] | undefined
    >([]);

    const lineChartData = calculateLineChartData(
        transactionsData ?? transactions,
        currentWallet,
    );

    const verticalChartData = groupTransactionsByDate(
        transactionsData ?? transactions,
    );
    const categoryDropdown = createCategoryDataArray(categories);
    const { positiveResult, negativeResult } = processTransactions(
        transactionsData ?? transactions,
    );
    const walletDropdown = createWalletCategoryDataArray(wallets);

    const amounts = transactions.map((transaction) => transaction.amount);
    const minAmount = Math.min(...amounts);
    const maxAmount = Math.max(...amounts);
    const rangeLimits = { min: minAmount, max: maxAmount };
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const handleResetFilters = useCallback(() => {
        setWallet({
            value: '',
            name: 'Select...',
        });
        setCurrentRange({ min: minAmount, max: maxAmount });
        setCategory({
            value: '',
            name: 'Select...',
        });
        setFilters({
            value: '',
            name: '',
        });
        setCurrentWallet({} as WalletGetAllItemResponseDto);
        setTransactionsData([]);
    }, [maxAmount, minAmount]);

    useEffect(() => {
        void dispatch(walletsActions.loadAll());
        void dispatch(categoriesActions.loadCategories());
        void dispatch(transactionsActions.loadTransactions());
        setCurrentRange({ min: minAmount, max: maxAmount });
    }, [dispatch, maxAmount, minAmount]);

    const filterTransactions = (
        transactions: TransactionGetAllItemResponseDto[],
        filter: TransactionFilter,
    ): TransactionGetAllItemResponseDto[] => {
        const { walletName, categoryName, amountRange, note } = filter;

        return transactions.filter((transaction) => {
            const walletMatch =
                walletName === undefined ||
                transaction.walletsId ===
                    wallets.find((wallet) => wallet.name === walletName)?.id;

            const categoryMatch =
                categoryName === undefined ||
                transaction.categoryId ===
                    categories.find(
                        (category) => category.name === categoryName,
                    )?.id;

            const amountMatch =
                amountRange === undefined ||
                (transaction.amount >= amountRange.min &&
                    transaction.amount <= amountRange.max);

            const noteMatch =
                note === undefined ||
                transaction.note?.toLowerCase().includes(note.toLowerCase());

            return walletMatch && categoryMatch && amountMatch && noteMatch;
        });
    };

    useEffect(() => {
        const filter: TransactionFilter = {
            walletName: wallet?.name,
            categoryName: category?.name,
            amountRange: currentRange,
            note: filters.name,
        };

        const filteredTransactions = filterTransactions(transactions, filter);
        setTransactionsData(filteredTransactions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions, wallet, category, currentRange, filters]);

    const transactionData = transactionsData?.map((item) => ({
        id: item.id,
        date: item.date,
        category: categories.find(
            (category) => category.id === item.categoryId,
        ),
        name: categories.find((category) => category.id === item.categoryId)
            ?.name,
        label: item.labelId,
        amount: item.amount,
        currency: currencies.find((currency) => currency.id === item.currencyId)
            ?.symbol,
        note: item.note,
    })) as unknown as TransactionType[];

    const walletsWithBalances = calculateWalletBalances(wallets, transactions);

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Wallets</h2>
                    <div className={styles.wallets}>
                        {walletsWithBalances.map(
                            ({ id, name, balance, currencyId }) => (
                                <Link
                                    to={`/wallet/${id}/transaction`}
                                    key={id}
                                    className={styles.walletWrapper}
                                >
                                    <WalletCard
                                        title={name}
                                        size={WalletCardSize.MEDIUM}
                                        balance_value={balance}
                                        wallet_type={'Balance'}
                                        currency={
                                            findCurrencyById(
                                                currencies,
                                                currencyId,
                                            )?.symbol
                                        }
                                    />
                                </Link>
                            ),
                        )}
                        <WalletButton onClick={handleModal}>
                            Add New Wallet
                        </WalletButton>
                        <NewWalletModal
                            isShown={active}
                            onClose={handleCancel}
                            onSubmit={handleModal}
                        />
                    </div>
                    <h2 className={classNames(styles.title, styles.overview)}>
                        Overview
                    </h2>
                </div>
            </div>
            <div
                className={classNames(
                    styles.dashboard,
                    styles.filtersDashboard,
                )}
            >
                <div className={styles.contentWrapper}>
                    <div className={styles.filtertBody}>
                        <div className={styles.filters}>
                            <div>
                                <div className={styles.largeCalendar}>
                                    <Calendar
                                        isRangeCalendar
                                        initialRange={day}
                                        onRangeChange={handleSelectDay}
                                    />
                                </div>
                                <div className={styles.smallCalendar}>
                                    <Calendar isRangeCalendar={false} />
                                </div>
                            </div>
                            <div className={styles.buttonWrapper}>
                                <Button
                                    variant={ButtonVariant.PLAIN}
                                    className={styles.resetButton}
                                    onClick={handleResetFilters}
                                >
                                    Reset filters
                                </Button>
                            </div>
                        </div>
                        <div className={styles.filtersContainer}>
                            <Dropdown
                                data={walletDropdown}
                                handleChange={handleDropdownByWallets}
                                selectedOption={wallet}
                                label="By wallet"
                                labelClassName={styles.dropdownLabel}
                                placeholder={'Select...'}
                            />
                            <Dropdown
                                data={categoryDropdown}
                                handleChange={handleDropdownByCategory}
                                selectedOption={category}
                                label="By category"
                                labelClassName={styles.dropdownLabel}
                                placeholder={'Select...'}
                            />
                            <Input
                                labelClassName={styles.filterLabel}
                                control={control}
                                errors={errors}
                                label={'By note'}
                                name={'name'}
                                value={filters.name}
                                onChange={handleChange}
                                placeholder={'Filter by specific keyword'}
                            />
                            <div className={styles.filter}>
                                <span className={styles.categoryText}>
                                    By amount
                                </span>
                                <div className={styles.slider}>
                                    <RangeSlider
                                        rangeLimits={rangeLimits}
                                        currentRange={currentRange}
                                        onChange={handleSliderChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames(styles.dashboard, styles.barsDashboard)}>
                <div className={styles.contentWrapper}>
                    <div className={styles.bars}>
                        <div className={styles.cards}>
                            <CardTotal
                                title="Total Balance"
                                sum={
                                    walletsWithBalances.find(
                                        (wallet) =>
                                            wallet.id === currentWallet?.id,
                                    )?.balance ??
                                    walletsWithBalances.reduce(
                                        (accumulator, wallet) => {
                                            return (
                                                +accumulator + +wallet.balance
                                            );
                                        },
                                        0,
                                    )
                                }
                                variant={CardVariant.ORANGE}
                                currency={matchingCurrency?.symbol as string}
                            />
                            <CardTotal
                                title="Total Period Change"
                                sum={getTotalTransactionSum(
                                    transactionsData as TransactionGetAllItemResponseDto[],
                                    currentWallet?.id,
                                )}
                                variant={CardVariant.BLUE}
                                currency={matchingCurrency?.symbol as string}
                            />
                            <CardTotal
                                title="Total Period Income"
                                sum={getTotalPeriodAmount(
                                    transactionsData as TransactionGetAllItemResponseDto[],
                                    'income',
                                    currentWallet
                                        ? currentWallet.id
                                        : undefined,
                                )}
                                variant={CardVariant.VIOLET}
                                currency={matchingCurrency?.symbol as string}
                            />

                            <CardTotal
                                title="Total Period Expenses"
                                sum={getTotalPeriodAmount(
                                    transactionsData as TransactionGetAllItemResponseDto[],
                                    'expense',
                                    currentWallet?.id,
                                )}
                                variant={CardVariant.WHITE}
                                currency={matchingCurrency?.symbol as string}
                            />
                        </div>
                        {transactions.length > 0 ? (
                            <div className={styles.charts}>
                                <ChartBox
                                    title={'Account Balance'}
                                    date={formatRangeGraph(day)}
                                    // controls={
                                    //     <ButtonTabs
                                    //         tabsData={firstTabs}
                                    //         onClick={setFirstTabs}
                                    //     />
                                    // }
                                >
                                    <LineChart
                                        dataArr={filterLineChart(
                                            day,
                                            lineChartData,
                                        )}
                                    />
                                </ChartBox>
                                <ChartBox
                                    title={'Changes'}
                                    date={formatRangeGraph(day)}
                                    // controls={
                                    //     <ButtonTabs
                                    //         tabsData={secondTabs}
                                    //         onClick={setSecondTabs}
                                    //     />
                                    // }
                                >
                                    <Chart
                                        array={filterChart(
                                            day,
                                            verticalChartData,
                                        )}
                                    />
                                </ChartBox>
                                <ChartBox
                                    title={'Period income'}
                                    date={formatRangeGraph(day)}
                                    transactions={transactionData.filter(
                                        (transaction) => transaction.amount > 0,
                                    )}
                                >
                                    <DoughnutChart
                                        categories={filterCategories(
                                            day,
                                            positiveResult,
                                        )}
                                    />
                                </ChartBox>
                                <ChartBox
                                    title={'Period Expenses'}
                                    date={formatRangeGraph(day)}
                                    transactions={transactionData.filter(
                                        (transaction) => transaction.amount < 0,
                                    )}
                                >
                                    <DoughnutChart
                                        categories={filterCategories(
                                            day,
                                            negativeResult,
                                        )}
                                    />
                                </ChartBox>
                            </div>
                        ) : (
                            <Placeholder
                                path={DashboardPlaceholder}
                                body={'You have no transactions yet.'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Dashboard };
