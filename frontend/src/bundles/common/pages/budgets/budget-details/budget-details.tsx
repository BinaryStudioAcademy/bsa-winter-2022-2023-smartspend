import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardPlaceholder from '~/assets/img/dashboard-placeholder.png';
import { actions as budgetsActions } from '~/bundles/budgets/store';
import {
    BaseModal,
    Button,
    CardTotal,
    Loader,
    Placeholder,
    TransactionTable,
} from '~/bundles/common/components/components';
import { type TransactionType } from '~/bundles/common/components/transanction-table/types/transaction.type.js';
import {
    AppDocumentTitles,
    AppRoute,
    ButtonSize,
    ButtonVariant,
    CardVariant,
} from '~/bundles/common/enums/enums';
import {
    dateToShortStringHelper,
    toCustomLocaleString,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppDocumentTitle,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';
import { actions as transactionsActions } from '~/bundles/common/stores/transactions';
import { DoughnutChartCartVariant } from '~/bundles/landing/enums/enums';
import { actions as walletsActions } from '~/bundles/wallets/store';

import { BudgetModal, BudgetProgressBar } from './components/components.js';
import { DoughnutChartCard } from './components/doughnut-chart-card/doughnut-chart-card';
import { InfoCardTypes } from './enums/enums';
import {
    calculateBudgetDetails,
    getSpent,
    gradientDoughnut,
} from './helpers/helpers';
import styles from './styles.module.scss';

type DoughnutData = Record<
    string,
    {
        total: number;
        count: number;
        color: string;
        currency: string;
        name: string;
        icon?: string;
        type?: string;
    }
>;

// eslint-disable-next-line sonarjs/cognitive-complexity
const BudgetDetails = (): JSX.Element => {
    useAppDocumentTitle(AppDocumentTitles.BUDGET);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [spent, setSpent] = useState(0);
    const [isModalShown, setIsModalShown] = useState(false);
    const [isSelectedTransactions, setIsSelectedTransactions] = useState<
        string[]
    >([]);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const { budgets } = useAppSelector((state) => state.budgets);
    const { currencies } = useAppSelector((state) => state.currencies);
    const { user } = useAppSelector((state) => state.users);
    const categories = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );
    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items ?? [],
    );
    const matchingCurrency = currencies.find(
        (currency) => currency.shortName === user?.currency,
    );
    const wallets = useAppSelector((state) => state.wallets.wallets);

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

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleCloseModalDelete = useCallback(() => {
        setIsDeleteModalShown(false);
    }, []);

    const handleClickDeleteTransactions = useCallback(() => {
        void dispatch(
            transactionsActions.removeTransactions(isSelectedTransactions),
        );
        setIsSelectedTransactions([]);
        setIsDeleteModalShown(false);
    }, [dispatch, isSelectedTransactions]);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);

    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    const handleCancelDelete = useCallback(() => {
        setIsModalShown(false);
    }, []);

    const handleModalDelete = useCallback(() => {
        setIsModalShown(true);
    }, []);

    const onClickDeleteBudget = useCallback(
        (id: string): void => {
            void dispatch(budgetsActions.remove(id));
            navigate(AppRoute.BUDGETS);
        },
        [dispatch, navigate],
    );

    const handleDeleteBudget = useCallback(() => {
        id && onClickDeleteBudget(id);
    }, [id, onClickDeleteBudget]);

    const currentBudget = budgets.find((budget) => budget.id === id);
    const budgetCategories = currentBudget?.categories.map((category) =>
        categories.find((it) => it.id === category.id),
    );
    const budgetTransactions = transactions.filter((transaction) =>
        budgetCategories?.find((it) => it?.id === transaction.categoryId),
    );

    useEffect(() => {
        void dispatch(budgetsActions.loadAll());
        void dispatch(categoriesActions.loadCategories());
        void dispatch(transactionsActions.loadTransactions());
        void dispatch(walletsActions.loadAll());
    }, [dispatch]);

    useEffect(() => {
        setSpent(getSpent(budgetTransactions));
    }, [budgetTransactions]);

    if (!currentBudget) {
        return (
            <div className={styles.loaderContainer}>
                <Loader />
            </div>
        );
    }

    const { amount, startDate, recurrence, endDate, name } = currentBudget;

    const { canSpend, moneyLeft } = calculateBudgetDetails({
        amount,
        startDate,
        recurrence,
        spent,
    });

    const transactionData = budgetTransactions.map((item) => ({
        id: item.id,
        date: item.date,
        category: budgetCategories?.find((cat) => cat?.id === item.categoryId),
        name: budgetCategories?.find((cat) => cat?.id === item.categoryId)
            ?.name,
        label: item.labelId,
        amount: item.amount,
        currency: matchingCurrency?.symbol as string,
        note: item.note,
        walletsId: wallets.find((cat) => cat.id === item.walletsId)?.id,
    })) as unknown as TransactionType[];

    const shortName = matchingCurrency?.shortName as string;

    const canSpending =
        canSpend > 0
            ? toCustomLocaleString(canSpend, shortName, true).replace('+', '')
            : 0;

    const transactionSortByType = transactionData.filter(
        (item) => item.category.type === 'expense',
    );

    const doughnutDataWallet: DoughnutData = {};

    for (const item of transactionSortByType) {
        const walletsId = item.walletsId;
        const amount = item.amount;
        const currency = item.currency as string;
        const color = gradientDoughnut.find(
            (color) => color.name === item.category.color,
        )?.value as string;
        const name = wallets.find((cat) => cat.id === item.walletsId)
            ?.name as string;

        if (walletsId in doughnutDataWallet) {
            doughnutDataWallet[walletsId].total += amount;
            doughnutDataWallet[walletsId].count += 1;
        } else {
            doughnutDataWallet[walletsId] = {
                total: amount,
                count: 1,
                color,
                currency,
                name,
            };
        }
    }

    const doughnutData: DoughnutData = {};

    for (const item of transactionSortByType) {
        const category = item.category.name;
        const amount = item.amount;
        const icon = item.category.icon;
        const name = item.category.name;
        const type = item.category.type;
        const currency = item.currency as string;
        const color = gradientDoughnut.find(
            (color) => color.name === item.category.color,
        )?.value as string;
        if (category in doughnutData) {
            doughnutData[category].total += amount;
            doughnutData[category].count += 1;
        } else {
            doughnutData[category] = {
                total: amount,
                count: 1,
                color,
                name,
                icon,
                type,
                currency,
            };
        }
    }

    const doughnutChartExpense = Object.values(doughnutData);
    const doughnutChartWallets = Object.values(doughnutDataWallet);

    return (
        <div className={styles.container}>
            <BaseModal
                isShown={isModalShown}
                onClose={handleCancelDelete}
                onSubmit={handleDeleteBudget}
                Header={
                    <h1 className={styles.modalTitle}>
                        Delete budget &quot;{name}&quot;
                    </h1>
                }
                Body={
                    <p className={styles.modalDetailsContainer}>
                        Are you sure you want to delete the budget &quot;
                        {name}&quot;?
                    </p>
                }
                submitButtonName={'Delete Budget'}
                submitButtonVariant={ButtonVariant.DELETE}
                footerContainerClass={styles.modalFooter}
                buttonsSize={ButtonSize.MEDIUM}
            />
            <div className={classNames(styles.contentWrapper, 'container')}>
                <div className={styles.calendarWrapper}></div>
                <div className={styles.budgetInfoWrapper}>
                    <div className={styles.breadcrumbsWrapper}>{name}</div>
                    <div className={styles.editButtonWrapper}>
                        <div className={styles.buttonsContainer}>
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
                                className={styles.editButton}
                                variant={ButtonVariant.SECONDARY}
                                onClick={handleModal}
                            >
                                Edit budget
                            </Button>
                        </div>
                        <div className={styles.modal}>
                            <BudgetModal
                                isEdit
                                isShown={active}
                                onClose={handleCancel}
                                onClick={handleModalDelete}
                                budget={currentBudget}
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
                <div className={styles.cardsWrapper}>
                    <CardTotal
                        title={InfoCardTypes.ORIGINALLY}
                        sum={amount}
                        variant={CardVariant.ORANGE}
                        currency={matchingCurrency?.symbol as string}
                    />
                    <CardTotal
                        title={InfoCardTypes.SPENT}
                        sum={spent}
                        variant={CardVariant.BLUE}
                        currency={matchingCurrency?.symbol as string}
                    />
                    <CardTotal
                        title={moneyLeft > 0 ? 'Money left' : 'Money overspent'}
                        sum={moneyLeft}
                        variant={CardVariant.VIOLET}
                        currency={matchingCurrency?.symbol as string}
                    />
                    <CardTotal
                        title={InfoCardTypes.CAN}
                        sum={canSpend}
                        variant={CardVariant.WHITE}
                        currency={matchingCurrency?.symbol as string}
                    />
                </div>
                <div className={styles.progressWrapper}>
                    <div>Budget progress</div>
                    <div className={styles.progressContent}>
                        <div>{`You can spend ${canSpending}/Day`}</div>
                        <BudgetProgressBar
                            totalBudget={amount}
                            spentSoFar={moneyLeft}
                        />
                        <div className={styles.periodBudgetWrapper}>
                            <div>
                                {
                                    dateToShortStringHelper([
                                        { date: startDate },
                                    ])[0].date
                                }
                            </div>
                            <div>
                                {
                                    dateToShortStringHelper([
                                        { date: endDate as string },
                                    ])[0].date
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {transactions.length > 0 ? (
                    <>
                        <div className={styles.cartBoxWrapper}>
                            <div className={styles.chartWrapper}>
                                <DoughnutChartCard
                                    variant={DoughnutChartCartVariant.SECONDARY}
                                    title={'Accounted Categories'}
                                    date={startDate}
                                    categories={doughnutChartExpense}
                                />
                            </div>
                            <div className={styles.chartWrapper}>
                                <DoughnutChartCard
                                    title={'Accounted Wallets'}
                                    date={startDate}
                                    transaction_num={0}
                                    transaction_type={''}
                                    transaction_sum={''}
                                    categories={doughnutChartWallets}
                                />
                            </div>
                        </div>
                        <div className={styles.transactionTable}>
                            <TransactionTable
                                transactions={transactionSortByType}
                                addIdCheckedTransactions={
                                    addIdCheckedTransactions
                                }
                            />
                        </div>
                    </>
                ) : (
                    <Placeholder
                        path={DashboardPlaceholder}
                        body={'You have no transactions yet.'}
                    />
                )}
            </div>
        </div>
    );
};

export { BudgetDetails };
