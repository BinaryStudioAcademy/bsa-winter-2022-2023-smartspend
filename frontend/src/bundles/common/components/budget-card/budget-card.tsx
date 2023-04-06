import { Link } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    dateToShortStringHelper,
    toCustomLocaleString,
} from '~/bundles/common/helpers/helpers.js';

import { calculateBudgetDetails } from '../../pages/budgets/budget-details/helpers/helpers';
import styles from './styles.module.scss';

type Properties = {
    id: string;
    title: string;
    amount: number;
    currency: string;
    recurrence: string;
    startDate: string;
};

const spent = 500;

const BudgetCard: React.FC<Properties> = ({
    id,
    title,
    amount,
    currency,
    recurrence,
    startDate,
}) => {
    const budgetDetailRoute = `${AppRoute.BUDGETS}/${id}`;
    const { moneyLeft, lastDate } = calculateBudgetDetails({
        amount,
        startDate,
        recurrence,
        spent,
    });
    const value = Math.round((100 * moneyLeft) / amount);

    return (
        <Link className={styles.card} to={budgetDetailRoute}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.headerTitle}>{title}</h2>
                    <p className={styles.headerSubtext}>All wallets</p>
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
                        <span className={styles.footerSpan}>{lastDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export { BudgetCard };
