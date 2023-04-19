import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { type BudgetSliceResponseDto } from '~/bundles/budgets/types/types';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    dateToShortStringHelper,
    toCustomLocaleString,
} from '~/bundles/common/helpers/helpers.js';
import { actions as transactionsActions } from '~/bundles/common/stores/transactions';

import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useState,
} from '../../hooks/hooks';
import {
    calculateBudgetDetails,
    getSpent,
} from '../../pages/budgets/budget-details/helpers/helpers';
import styles from './styles.module.scss';

type Properties = {
    budget: BudgetSliceResponseDto;
    currency: string;
};

const BudgetCard: React.FC<Properties> = ({ budget, currency }) => {
    const dispatch = useAppDispatch();
    const [spent, setSpent] = useState(0);

    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items ?? [],
    );
    const { categoriesSortByType } = useAppSelector(
        (state) => state.categories,
    );

    const budgetCategories = budget.categories.map((category) =>
        categoriesSortByType?.expense.find((it) => it.id === category.id),
    );
    const budgetTransactions = transactions.filter((transaction) =>
        budgetCategories.find((it) => it?.id === transaction.categoryId),
    );

    useEffect(() => {
        void dispatch(transactionsActions.loadTransactions());
    }, [dispatch]);

    useEffect(() => {
        setSpent(getSpent(budgetTransactions));
    }, [budgetTransactions]);

    const budgetDetailRoute = `${AppRoute.BUDGETS}/${budget.id}`;
    const { moneyLeft } = calculateBudgetDetails({
        amount: budget.amount,
        startDate: budget.startDate,
        recurrence: budget.recurrence,
        spent,
    });
    const value = Math.min((100 * moneyLeft) / budget.amount, 100).toFixed(1);
    const color = classNames(
        styles.footerProgress,
        Number(value) > 0 ? '' : styles.redGradient,
    );
    const percentageSpent = 100 - Number(value);

    return (
        <Link className={styles.card} to={budgetDetailRoute}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.headerTitle}>{budget.name}</h2>
                </div>
                <div className={styles.cardBody}>
                    <p className={styles.bodyAmount}>
                        {toCustomLocaleString(moneyLeft, currency, true)}
                        <span className={styles.textSpan}>
                            {+value > 0 ? 'left' : 'overspent'}
                        </span>
                    </p>
                    <p className={styles.text}>
                        from{' '}
                        {toCustomLocaleString(budget.amount, currency, true)}
                    </p>
                </div>
                <div className={styles.cardFooter}>
                    <p className={styles.text}>{value}%</p>
                    <div className={styles.budgetProgressBar}>
                        <div
                            className={styles.budgetProgressBarSpent}
                            style={{
                                width: `${
                                    percentageSpent > 0 ? percentageSpent : 0
                                }%`,
                            }}
                        />
                        <div className={color} style={{ width: `${value}%` }} />
                    </div>
                    <div className={styles.footerText}>
                        <span className={styles.footerSpan}>
                            {
                                dateToShortStringHelper([
                                    { date: budget.startDate },
                                ])[0].date
                            }
                        </span>
                        <span className={styles.footerSpan}>
                            {
                                dateToShortStringHelper([
                                    { date: budget.endDate ?? '' },
                                ])[0].date
                            }
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export { BudgetCard };
