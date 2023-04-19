import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { type MultiValue, type SingleValue } from 'react-select';
import { type CategoryGetAllItemResponseDto } from 'shared/build';

import DashboardPlaceholder from '~/assets/img/dashboard-placeholder.png';
import { RangeCalendar } from '~/bundles/common/components/calendar/components/components.js';
import {
    BaseModal,
    Button,
    CardTotal,
    Input,
    Loader,
    MultiDropdown,
    Placeholder,
    RangeSlider,
    TransactionModal,
    TransactionTable,
} from '~/bundles/common/components/components.js';
import { type TransactionType } from '~/bundles/common/components/transanction-table/types';
import {
    AppDocumentTitles,
    ButtonSize,
    ButtonVariant,
    CardVariant,
    DataStatus,
    FaIcons,
    InputType,
    TransactionModalType,
} from '~/bundles/common/enums/enums.js';
import { findMinMaxAmount } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppDocumentTitle,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';
import { actions as transactionsActions } from '~/bundles/common/stores/transactions';
import { type DataType } from '~/bundles/common/types/dropdown.type.js';
import { type RangeLimits } from '~/bundles/common/types/range-slider.type.js';
import { actions as walletsActions } from '~/bundles/wallets/store';
import { type WalletGetAllItemResponseDto } from '~/bundles/wallets/wallets';

import { getSpent } from '../budgets/budget-details/helpers/get-spent.helper';
import { getTotalPeriodAmount } from '../dashboard/helpers/helpers';
import styles from './styles.module.scss';

const DEFAULT_INPUT: { note: string } = {
    //It needs to change
    note: '',
};

const WalletDetails: React.FC = () => {
    useAppDocumentTitle(AppDocumentTitles.TRANSACTIONS);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [currentWallet, setCurrentWallet] = useState<
        WalletGetAllItemResponseDto | undefined
    >();
    const { wallets, dataStatus } = useAppSelector((state) => state.wallets);
    const { currencies } = useAppSelector((state) => state.currencies);
    const { user } = useAppSelector((state) => state.users);
    const matchingCurrency = currencies.find(
        (currency) => currency.shortName === user?.currency,
    );
    const { control, errors, watch, reset } = useAppForm<{ note: string }>({
        //It needs to change
        defaultValues: DEFAULT_INPUT,
    });

    const [isSelectedTransactions, setIsSelectedTransactions] = useState<
        string[]
    >([]);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleCloseModalDelete = useCallback(() => {
        setIsDeleteModalShown(false);
    }, []);

    const addIdCheckedTransactions = useCallback((id: string): void => {
        setIsSelectedTransactions((previousState) => {
            if (previousState.includes(id)) {
                return previousState.filter(
                    (previousState_) => previousState_ !== id,
                );
            }
            return [...previousState, id];
        });
    }, []);

    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items ?? [],
    );

    const category = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );

    const newDataMenu = category.map((item) => ({
        ...item,
        value: item.id,
    }));

    // const currency = findCurrencyById(
    //     currencies,
    //     currentWallet?.currencyId,
    // )?.symbol;

    const [transactionData, setTransactionData] = useState<TransactionType[]>(
        [],
    );

    const thisWalletTransactions = useMemo(
        () => transactions.filter((it) => it.walletsId === id),
        [id, transactions],
    );

    const data = useMemo(() => {
        return transactions.map((item) => ({
            id: item.id,
            date: item.date,
            category: category.find((cat) => cat.id === item.categoryId),
            name: category.find((cat) => cat.id === item.categoryId)?.name,
            label: item.labelId,
            amount: item.amount,
            currency: matchingCurrency?.symbol as string,
            note: item.note,
            walletsId: item.walletsId,
        })) as unknown as TransactionType[];
    }, [category, matchingCurrency?.symbol, transactions]);

    // const [peopleDropdown, setPeopleDropdown] = useState<
    //     MultiValue<DataType> | SingleValue<DataType>
    // >([]);
    const [rangeLimits, setRangeLimits] = useState(
        findMinMaxAmount(thisWalletTransactions),
    );
    const [categoriesDropdown, setCategoriesDropdown] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >([]);
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const [filteredData, setFilteredData] = useState(transactionData);
    const [activeModal, setActiveModal] = useState(false);

    const categoriesIdDropdown = new Set(
        (categoriesDropdown as unknown as CategoryGetAllItemResponseDto[]).map(
            (category) => category.id,
        ),
    );
    const getNoteFilter = watch('note');
    const transactionsByCategory = filteredData.filter((transaction) =>
        categoriesIdDropdown.has(transaction.category.id),
    );
    const isFilterEmpty =
        categoriesIdDropdown.size > 0 ? transactionsByCategory : filteredData;
    const transactionsByNote = isFilterEmpty.filter((transaction) =>
        transaction.note?.includes(getNoteFilter),
    );
    const categoryOrNoteFilter =
        getNoteFilter.length > 0 ? transactionsByNote : isFilterEmpty;

    const openTransactionModal = useCallback((): void => {
        setActiveModal(true);
    }, []);

    const closeTransactionModal = useCallback(() => {
        setActiveModal(false);
    }, []);

    // const handlePeopleMultiDropdownChange = useCallback(
    //     (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
    //         if (selectedOption === null) {
    //             setPeopleDropdown([]);
    //         } else {
    //             setPeopleDropdown(selectedOption);
    //         }
    //     },
    //     [],
    // );

    const handleCategoriesMultiDropdownChange = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            if (selectedOption === null) {
                setCategoriesDropdown([]);
            } else {
                setCategoriesDropdown(selectedOption);
            }
        },
        [],
    );

    const handleSliderChange = useCallback(
        (range: RangeLimits): void => {
            setCurrentRange(range);

            const newFilteredData = transactionData.filter(
                (item) => item.amount >= range.min && item.amount <= range.max,
            );
            setFilteredData(newFilteredData);
        },
        [transactionData],
    );

    const hangleReset = useCallback((): void => {
        // setPeopleDropdown([]);
        setCategoriesDropdown([]);
        setFilteredData(transactionData);
        setCurrentRange(rangeLimits);
        const isReset = reset;
        isReset && reset();
    }, [rangeLimits, reset, transactionData]);

    const handleNavidation = useCallback(() => {
        navigate(`/wallet/${id}/transaction/future`);
    }, [id, navigate]);

    useEffect(() => {
        setCurrentWallet(wallets.find((wallet) => wallet.id === id));
    }, [id, wallets]);

    const formatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                <input
                    type="checkbox"
                    checked={(categoriesDropdown as MultiValue<DataType>).some(
                        (option) => option.value === data.value,
                    )}
                    readOnly
                    className={styles.checkbox}
                />

                {data.icon && (
                    <span
                        style={{
                            background: `var(${data.color})`,
                            display: 'flex',
                            flexShrink: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '25px',
                            width: '25px',
                            borderRadius: '6px',
                            color: '#fff',
                        }}
                    >
                        <FontAwesomeIcon icon={data.icon as IconProp} />
                    </span>
                )}
                {data.icon && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [categoriesDropdown],
    );

    const handleClickDeleteTransactions = useCallback(() => {
        void dispatch(
            transactionsActions.removeTransactions(isSelectedTransactions),
        );
        setIsSelectedTransactions([]);
        setIsDeleteModalShown(false);
    }, [dispatch, isSelectedTransactions]);

    useEffect(() => {
        setCurrentWallet(wallets.find((wallet) => wallet.id === id));
    }, [id, wallets]);

    useEffect(() => {
        void dispatch(walletsActions.loadAll());
        void dispatch(transactionsActions.loadTransactions());
        void dispatch(categoriesActions.loadCategories());
        // void dispatch(currenciesActions.loadAll());
    }, [dispatch]);

    useEffect(() => {
        setRangeLimits(findMinMaxAmount(thisWalletTransactions));
    }, [thisWalletTransactions]);

    useEffect(() => {
        setCurrentRange(rangeLimits);
    }, [rangeLimits]);

    useEffect(() => {
        setFilteredData(transactionData);
    }, [transactionData]);

    useEffect(() => {
        setTransactionData(data);
    }, [data]);

    if (dataStatus === DataStatus.PENDING) {
        return (
            <div className={styles.loaderContainer}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={styles.app}>
            <div className={styles.body}>
                <div className={classNames(styles.bodyContainer, 'container')}>
                    <div className={styles.buttonsDate}>
                        <div className={styles.buttonsContainer}>
                            <Button
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                className={styles.transactionButton}
                                onClick={openTransactionModal}
                            >
                                <FontAwesomeIcon icon={FaIcons.PLUS} />
                                <span>Add transaction</span>
                            </Button>

                            <div className={styles.buttons}>
                                {isSelectedTransactions.length > 0 && (
                                    <Button
                                        className={styles.button}
                                        variant={ButtonVariant.DELETE}
                                        size={ButtonSize.MEDIUM}
                                        onClick={handleOpenModalDelete}
                                    >
                                        Delete
                                    </Button>
                                )}
                                <Button
                                    className={styles.button}
                                    variant={ButtonVariant.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    onClick={handleNavidation}
                                >
                                    Future
                                </Button>
                            </div>
                        </div>
                        <RangeCalendar />
                    </div>
                    <div className={styles.filters}>
                        <div
                            className={classNames(
                                styles.filtersContainer,
                                'container',
                            )}
                        >
                            <div className={styles.filterText}>
                                <h2>Filters</h2>
                                <button
                                    className={styles.reset}
                                    onClick={hangleReset}
                                >
                                    Reset filters
                                </button>
                            </div>
                            <div className={styles.applyFilters}>
                                <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <MultiDropdown
                                            formatOptionLabel={
                                                formatOptionLabel
                                            }
                                            data={newDataMenu}
                                            selectedOption={categoriesDropdown}
                                            handleChange={
                                                handleCategoriesMultiDropdownChange
                                            }
                                            label="By category"
                                        />
                                    </div>
                                </div>
                                {/* <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <MultiDropdown
                                            data={people}
                                            selectedOption={peopleDropdown}
                                            handleChange={
                                                handlePeopleMultiDropdownChange
                                            }
                                            label="By people"
                                        />
                                    </div>
                                </div> */}
                                <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <Input
                                            type={InputType.TEXT}
                                            label="By note"
                                            placeholder="Filter by specific keyword"
                                            name="note"
                                            control={control}
                                            errors={errors}
                                            inputClassName={styles.input}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={classNames(
                                        styles.filter,
                                        styles.rangeFilter,
                                    )}
                                >
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
                    <div className={styles.walletTransactions}>
                        <div className={styles.walletTransactionsContainer}>
                            <div className={styles.cards}>
                                <CardTotal
                                    title="Total Wallet Balance"
                                    sum={
                                        (currentWallet?.balance as number) +
                                        getSpent(thisWalletTransactions)
                                    }
                                    variant={CardVariant.ORANGE}
                                    currency={
                                        matchingCurrency?.symbol as string
                                    }
                                />
                                <CardTotal
                                    title="Total Period Change"
                                    sum={getSpent(thisWalletTransactions)}
                                    variant={CardVariant.BLUE}
                                    currency={
                                        matchingCurrency?.symbol as string
                                    }
                                />
                                <CardTotal
                                    title="Total Period Income"
                                    sum={getTotalPeriodAmount(
                                        thisWalletTransactions,
                                        'income',
                                    )}
                                    variant={CardVariant.VIOLET}
                                    currency={
                                        matchingCurrency?.symbol as string
                                    }
                                />
                                <CardTotal
                                    title="Total Period Expenses"
                                    sum={getTotalPeriodAmount(
                                        thisWalletTransactions,
                                        'expense',
                                    )}
                                    variant={CardVariant.WHITE}
                                    currency={
                                        matchingCurrency?.symbol as string
                                    }
                                />
                            </div>
                            {transactions.length > 0 ? (
                                <div className={styles.transactionsContainer}>
                                    <TransactionTable
                                        walletsId={id}
                                        transactions={categoryOrNoteFilter}
                                        addIdCheckedTransactions={
                                            addIdCheckedTransactions
                                        }
                                    />
                                </div>
                            ) : (
                                <Placeholder
                                    path={DashboardPlaceholder}
                                    body={'You have no transactions yet.'}
                                />
                            )}
                            <TransactionModal
                                type={TransactionModalType.ADD}
                                handleCancel={closeTransactionModal}
                                active={activeModal}
                            />
                            <BaseModal
                                isShown={isDeleteModalShown}
                                onClose={handleCloseModalDelete}
                                onSubmit={handleClickDeleteTransactions}
                                Header={
                                    <h2
                                        className={styles.modalTitle}
                                    >{`You're about to delete ${
                                        isSelectedTransactions.length
                                    } transaction${
                                        isSelectedTransactions.length > 1
                                            ? 's'
                                            : ''
                                    }`}</h2>
                                }
                                Body={
                                    <>
                                        <h4
                                            className={
                                                styles.modalDetailsContainer
                                            }
                                        >
                                            This change is irreversible. Do you
                                            really want to delete{' '}
                                            {isSelectedTransactions.length > 1
                                                ? 'them'
                                                : 'it'}
                                            ?
                                        </h4>
                                    </>
                                }
                                submitButtonName={`Delete transaction${
                                    isSelectedTransactions.length > 1 ? 's' : ''
                                }`}
                                submitButtonVariant={ButtonVariant.DELETE}
                                footerContainerClass={styles.modalFooter}
                                buttonsSize={ButtonSize.MEDIUM}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { WalletDetails };
