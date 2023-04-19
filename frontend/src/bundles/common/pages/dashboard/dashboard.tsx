// eslint-disable @typescript-eslint/no-unnecessary-condition
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
    Icon,
    Input,
    LineChart,
    Loader,
    NewWalletModal,
    Placeholder,
    RangeSlider,
    WalletCard,
} from '~/bundles/common/components/components.js';
import {
    AppDocumentTitles,
    ButtonVariant,
    CardVariant,
    DataStatus,
    FaIcons,
    IconSize,
} from '~/bundles/common/enums/enums.js';
import {
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
import { walletCardVariants } from '../../constants/wallet-card-variants.constant';
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
    groupTransactionsByCategory,
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
    const transactionsByCategory = groupTransactionsByCategory(transactions);

    const { currencies } = useAppSelector((state) => state.currencies);

    const { user } = useAppSelector((state) => state.users);

    const matchingCurrency = currencies.find(
        (currency) => currency.shortName === user?.currency,
    );

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
            {transactions.length > 0 && (
                <div className={styles.transactions}>
                    {Object.values(transactionsByCategory).map(
                        (transaction) => {
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
                                                    background: `var(${transaction.transactions[0].category.color})`,
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
                                                        transaction
                                                            .transactions[0]
                                                            .category
                                                            .icon as IconProp
                                                    }
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.transactionName
                                                }
                                            >
                                                {
                                                    transaction.transactions[0]
                                                        .category.name
                                                }
                                            </div>
                                        </div>
                                    )}

                                    <div className={styles.inDays}>
                                        {transaction.transactions.length}
                                        {transaction.transactions.length ===
                                            1 && ' transaction'}
                                        {transaction.transactions.length != 1 &&
                                            ' transactions'}
                                    </div>

                                    <div
                                        className={classNames(
                                            styles.columns,
                                            styles.rightColumn,
                                            transaction.transactions[0].amount <
                                                0
                                                ? styles.minus
                                                : styles.plus,
                                        )}
                                    >
                                        {transaction.total.toFixed(2)}
                                        {matchingCurrency?.symbol as string}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            )}
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

interface TransactionFilter {
    walletName?: string;
    categoryName?: string;
    amountRange?: { min: number; max: number };
    note?: string;
}

interface Category {
    id: string;
    type: string;
    value: string;
    text?: string;
    label?: string;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const Dashboard: React.FC = () => {
    useAppDocumentTitle(AppDocumentTitles.DASHBOARD);
    const dispatch = useAppDispatch();
    const [active, setActive] = useState(false);
    const { wallets } = useAppSelector((state) => state.wallets);
    const walletsDataStatus = useAppSelector(
        (state) => state.wallets.dataStatus,
    );

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

    const categoryDropdown = createCategoryDataArray(categories);

    const { control, errors } = useAppForm<FormValues>({
        defaultValues: { name: '', category: '', wallet: '' },
    });

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

    const [wallet, setWallet] = useState<DataType | null>();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const [category, setCategory] = useState<DataType | null>();

    const handleDropdownByCategory = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setCategory(selectedOption);
            }
        },
        [],
    );

    const iconFormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                {data.icon && (
                    <span
                        className={styles.dropdownColorIcon}
                        style={{
                            background: `var(${data.color})`,
                        }}
                    >
                        <Icon name={data.icon as IconProp} />
                    </span>
                )}
                {data.name && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [],
    );

    const categoryGroups: Record<string, Category[]> = {};

    /* eslint-disable @typescript-eslint/no-unnecessary-condition*/
    for (const category of categoryDropdown as Category[]) {
        if (!categoryGroups[category.type]) {
            categoryGroups[category.type] = [];
        }
        categoryGroups[category.type].push(category);
    }

    // eslint-disable-next-line sonarjs/no-unused-collection
    const data = [];

    if (categoryGroups.income) {
        data.push({ label: 'Income', options: categoryGroups.income });
    }

    if (categoryGroups.expense) {
        data.push({ label: 'Expense', options: categoryGroups.expense });
    }

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
    const [transactionData, setTransactionData] = useState<TransactionType[]>(
        [],
    );
    useEffect(() => {
        const newTransactionData = transactionsData?.map((item) => ({
            id: item.id,
            date: item.date,
            category: categories.find(
                (category) => category.id === item.categoryId,
            ),
            name: categories.find((category) => category.id === item.categoryId)
                ?.name,
            label: item.labelId,
            amount: item.amount,
            currency: currencies.find(
                (currency) => currency.id === item.currencyId,
            )?.symbol,
            note: item.note,
        })) as unknown as TransactionType[];
        setTransactionData(newTransactionData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionsData]);

    const lineChartData = calculateLineChartData(
        transactionsData ?? transactions,
        currentWallet,
    );

    const verticalChartData = groupTransactionsByDate(
        transactionsData ?? transactions,
    );

    const { positiveResult, negativeResult } = processTransactions(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        transactionData ?? [],
    );
    const walletDropdown = createWalletCategoryDataArray(wallets);

    const amounts = transactions.map((transaction) => transaction.amount);
    const minAmount = Math.min(...amounts);
    const maxAmount = Math.max(...amounts);
    const rangeLimits = { min: minAmount, max: maxAmount };
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const handleResetFilters = useCallback(() => {
        setWallet(null);
        setCurrentRange({ min: minAmount, max: maxAmount });
        setCategory(null);
        setFilters({
            value: '',
            name: '',
        });
        setCurrentWallet({} as WalletGetAllItemResponseDto);
        setTransactionsData([]);
    }, [maxAmount, minAmount]);

    useEffect(() => {
        void dispatch(categoriesActions.loadCategories());
        void dispatch(transactionsActions.loadTransactions());
        void dispatch(walletsActions.loadAll());
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
                note === '' ||
                transaction.note
                    ?.toLowerCase()
                    .includes(note?.toLowerCase() as string);

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
    }, [transactions, category, wallet, currentRange, filters]);

    const walletsWithBalances = calculateWalletBalances(wallets, transactions);

    if (walletsDataStatus === DataStatus.PENDING) {
        return (
            <div className={styles.loaderContainer}>
                <Loader />
            </div>
        );
    }

    const noTransactionsMessage = 'There nothing yet';

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Wallets</h2>
                    <div className={styles.wallets}>
                        {walletsWithBalances.map(
                            ({ id, name, balance }, index) => (
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
                                        variant={
                                            walletCardVariants[
                                                index %
                                                    walletCardVariants.length
                                            ]
                                        }
                                        currency={
                                            matchingCurrency?.symbol as string
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
                                data={data as unknown as DataType[]}
                                handleChange={handleDropdownByCategory}
                                selectedOption={category}
                                label="By category"
                                labelClassName={styles.dropdownLabel}
                                placeholder={'Select...'}
                                formatOptionLabel={iconFormatOptionLabel}
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
                        {/*  eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                        {transactions.length > 0 && transactionData ? (
                            <div className={styles.charts}>
                                <ChartBox
                                    title={'Account Balance'}
                                    date={formatRangeGraph(day)}
                                >
                                    {lineChartData.length > 1 ? (
                                        <LineChart
                                            dataArr={filterLineChart(
                                                day,
                                                lineChartData,
                                            )}
                                        />
                                    ) : (
                                        <Placeholder
                                            icon={FaIcons.MONEY_CHECK_DOLLAR}
                                            iconSize={IconSize.ONE_HUNDRED}
                                            margin={'30px auto'}
                                            body={noTransactionsMessage}
                                        />
                                    )}
                                </ChartBox>
                                <ChartBox
                                    title={'Changes'}
                                    date={formatRangeGraph(day)}
                                >
                                    {verticalChartData.every(
                                        (data) => data.data.length === 0,
                                    ) ? (
                                        <Placeholder
                                            icon={FaIcons.MONEY_CHECK_DOLLAR}
                                            iconSize={IconSize.ONE_HUNDRED}
                                            margin={'30px auto'}
                                            body={noTransactionsMessage}
                                        />
                                    ) : (
                                        <Chart
                                            array={filterChart(
                                                day,
                                                verticalChartData,
                                            )}
                                        />
                                    )}
                                </ChartBox>
                                <ChartBox
                                    title={'Period Income'}
                                    date={formatRangeGraph(day)}
                                    transactions={transactionData.filter(
                                        (transaction) => transaction.amount > 0,
                                    )}
                                >
                                    {positiveResult.length > 0 ? (
                                        <DoughnutChart
                                            categories={filterCategories(
                                                day,
                                                positiveResult,
                                            )}
                                        />
                                    ) : (
                                        <Placeholder
                                            icon={FaIcons.MONEY_CHECK_DOLLAR}
                                            iconSize={IconSize.ONE_HUNDRED}
                                            margin={'30px auto'}
                                            body={
                                                'You have no income transactions yet'
                                            }
                                        />
                                    )}
                                </ChartBox>
                                <ChartBox
                                    title={'Period Expenses'}
                                    date={formatRangeGraph(day)}
                                    transactions={transactionData.filter(
                                        (transaction) => transaction.amount < 0,
                                    )}
                                >
                                    {negativeResult.length > 0 ? (
                                        <DoughnutChart
                                            categories={filterCategories(
                                                day,
                                                negativeResult,
                                            )}
                                        />
                                    ) : (
                                        <Placeholder
                                            icon={FaIcons.MONEY_CHECK_DOLLAR}
                                            iconSize={IconSize.ONE_HUNDRED}
                                            margin={'30px auto'}
                                            body={
                                                'You have no expense transactions yet'
                                            }
                                        />
                                    )}
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
