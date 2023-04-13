import { Link } from 'react-router-dom';

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
    id: string;
    title: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
    endDate: string;
};

const BudgetCard: React.FC<Properties> = ({
    id,
    title,
    amount,
    currency,
    recurrence,
    startDate,
    endDate,
}) => {
    const dispatch = useAppDispatch();
    const [spent, setSpent] = useState(0);

    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items ?? [],
    );

    useEffect(() => {
        void dispatch(transactionsActions.loadTransactions());
    }, [dispatch]);

    useEffect(() => {
        setSpent(getSpent(transactions));
    }, [transactions]);

    const budgetDetailRoute = `${AppRoute.BUDGETS}/${id}`;
    const { moneyLeft } = calculateBudgetDetails({
        amount,
        startDate,
        recurrence,
        spent,
    });
    const value = Math.min((100 * moneyLeft) / amount, 100).toFixed(1);

    return (
        <Link className={styles.card} to={budgetDetailRoute}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.headerTitle}>{title}</h2>
                </div>
                <div className={styles.cardBody}>
                    <p className={styles.bodyAmount}>
                        {toCustomLocaleString(moneyLeft, currency, true)}
                        <span className={styles.textSpan}>left</span>
                    </p>
                    <p className={styles.text}>
                        from {toCustomLocaleString(amount, currency, true)}
                    </p>
                </div>
                <div className={styles.cardFooter}>
                    <p className={styles.text}>{value}%</p>
                    <progress
                        className={styles.footerProgress}
                        max="100"
                        value={value}
                    ></progress>
                    <div className={styles.footerText}>
                        <span className={styles.footerSpan}>
                            {
                                dateToShortStringHelper([
                                    { date: startDate },
                                ])[0].date
                            }
                        </span>
                        <span className={styles.footerSpan}>
                            {
                                dateToShortStringHelper([{ date: endDate }])[0]
                                    .date
                            }
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export { BudgetCard };
