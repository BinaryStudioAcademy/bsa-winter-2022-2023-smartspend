import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';

import { actions as budgetsActions } from '~/bundles/budgets/store';
import { type BudgetSliceResponseDto } from '~/bundles/budgets/types/types.js';
import { Calendar } from '~/bundles/common/components/calendar/calendar';
import {
    Button,
    Loader,
    TransactionTable,
} from '~/bundles/common/components/components';
import { type ITransaction } from '~/bundles/common/components/transanction-table/types/transaction.type.js';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import {
    dateToShortStringHelper,
    toCustomLocaleString,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';
import { actions as transactionsActions } from '~/bundles/common/stores/transactions';
import { DoughnutChartCartVariant } from '~/bundles/landing/enums/enums';

import {
    BudgetModal,
    BudgetProgressBar,
    InfoCard,
} from './components/components.js';
import { DoughnutChartCard } from './components/doughnut-chart-card/doughnut-chart-card';
import { InfoCardTypes } from './enums/enums';
import { calculateBudgetDetails, gradientDoughnut } from './helpers/helpers';
import styles from './styles.module.scss';

type DoughnutData = Record<
    string,
    {
        total: number;
        count: number;
        color: string;
        name: string;
        icon: string;
    }
>;

const BudgetDetails = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [currentBudget, setCurrenBudget] = useState<
        BudgetSliceResponseDto | undefined
    >();
    const [spent, setSpent] = useState(0);
    const { budgets } = useAppSelector((state) => state.budgets);
    const { currencies } = useAppSelector((state) => state.currencies);

    const categories = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );

    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items ?? [],
    );

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);

    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    const onClickDeleteBudget = useCallback(
        (id: string): void => {
            void dispatch(budgetsActions.remove(id));
            navigate('/budgets');
        },
        [dispatch, navigate],
    );

    const handleDeleteBudget = useCallback(() => {
        if (id) {
            onClickDeleteBudget(id);
        }
    }, [id, onClickDeleteBudget]);

    useEffect(() => {
        setCurrenBudget(budgets.find((budget) => budget.id === id));
    }, [budgets, id]);

    useEffect(() => {
        void dispatch(budgetsActions.loadAll());
        void dispatch(categoriesActions.loadCategories());
        void dispatch(transactionsActions.loadTransactions());
    }, [dispatch]);

    useEffect(() => {
        const spentResult = transactions.reduce(
            (accumulator, current) => accumulator + current.amount,
            0,
        );
        setSpent(spentResult);
    }, [transactions]);

    if (!currentBudget) {
        return <Loader />;
    }

    const { amount, startDate, recurrence, name, currency } = currentBudget;

    const { canSpend, moneyLeft, lastDate } = calculateBudgetDetails({
        amount,
        startDate,
        recurrence,
        spent,
    });

    const transactionData = transactions.map((item) => ({
        id: item.id,
        date: item.date,
        category: categories.find((cat) => cat.id === item.categoryId),
        name: categories.find((cat) => cat.id === item.categoryId)?.name,
        label: item.labelId,
        amount: item.amount,
        currency: currencies.find((current) => current.id === item.currencyId)
            ?.symbol,
        note: item.note,
    })) as unknown as ITransaction[];

    const canSpending =
        canSpend > 0
            ? toCustomLocaleString(canSpend, currency, true).replace('+', '')
            : 0;

    const doughnutData: DoughnutData = {};

    for (const item of transactionData) {
        const category = item.category.name;
        const amount = item.amount;
        const icon = item.category.icon;
        const name = item.category.name;
        const color =
            gradientDoughnut[
                Math.floor(Math.random() * gradientDoughnut.length)
            ];

        if (doughnutData[category]) {
            doughnutData[category].total += amount;
            doughnutData[category].count += 1;
        } else {
            doughnutData[category] = {
                total: amount,
                count: 1,
                color,
                name,
                icon,
            };
        }
    }

    const doughnutChartData = Object.values(doughnutData);

    return (
        <div className={styles.container}>
            <div className={classNames(styles.contentWrapper, 'container')}>
                <div className={styles.calendarWrapper}>
                    <Calendar isRangeCalendar={true} />
                </div>
                <div className={styles.budgetInfoWrapper}>
                    <div className={styles.breadcrumbsWrapper}>{name}</div>
                    <div className={styles.editButtonWrapper}>
                        <Button
                            className={styles.editButton}
                            variant={ButtonVariant.SECONDARY}
                            onClick={handleModal}
                        >
                            Edit budget
                        </Button>
                        <div className={styles.modal}>
                            <BudgetModal
                                isEdit
                                isShown={active}
                                onClose={handleCancel}
                                onClick={handleDeleteBudget}
                                budget={currentBudget}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.cardsWrapper}>
                    <InfoCard
                        type={InfoCardTypes.ORIGINALLY}
                        total={amount}
                        currency={currency}
                    />

                    <InfoCard
                        type={InfoCardTypes.SPENT}
                        total={spent}
                        currency={currency}
                    />
                    <InfoCard
                        type={InfoCardTypes.LEFT}
                        total={moneyLeft}
                        currency={currency}
                    />
                    <InfoCard
                        type={InfoCardTypes.CAN}
                        total={canSpend}
                        currency={currency}
                    />
                </div>
                <div className={styles.progressWrapper}>
                    <div>Budget progress</div>
                    <div className={styles.progressContent}>
                        <div>{`You can spending ${canSpending}/Day`}</div>
                        <BudgetProgressBar
                            totalBudget={amount}
                            spentSoFar={spent}
                        />
                        <div className={styles.periodBudgetWrapper}>
                            <div>
                                {
                                    dateToShortStringHelper([
                                        { date: startDate },
                                    ])[0].date
                                }
                            </div>
                            <div>{lastDate}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.cartBoxWrapper}>
                    <div className={styles.chartWrapper}>
                        <DoughnutChartCard
                            variant={DoughnutChartCartVariant.SECONDARY}
                            title={'Accounted Categories'}
                            date={startDate}
                            categories={doughnutChartData}
                        />
                    </div>
                    <div className={styles.chartWrapper}>
                        <DoughnutChartCard
                            title={'Accounted Wallets'}
                            date={startDate}
                            transaction_num={0}
                            transaction_type={''}
                            transaction_sum={''}
                            categories={doughnutChartData}
                        />
                    </div>
                </div>
                <div className={styles.transactionTable}>
                    <TransactionTable transactions={transactionData} />
                </div>
            </div>
        </div>
    );
};

export { BudgetDetails };
