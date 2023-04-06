import { Link } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { toCustomLocaleString } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    id: string;
    title: string;
    total: number;
    moneyLeft: number;
    currency: string;
    date: string;
};

const BudgetCard: React.FC<Properties> = ({
    id,
    title,
    total,
    moneyLeft,
    currency,
    date,
}) => {
    const value = Math.round((100 * moneyLeft) / total);
    const budgetDetailRoute = `${AppRoute.BUDGETS}/${id}`;

    return (
        <Link className={styles.card} to={budgetDetailRoute}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.headerTitle}>{title}</h2>
                    <p className={styles.headerSubtext}>All wallets</p>
                </div>
                <div className={styles.cardBody}>
                    <p className={styles.bodyAmount}>
                        {toCustomLocaleString(moneyLeft)} {currency}
                        <span className={styles.textSpan}>left</span>
                    </p>
                    <p className={styles.text}>
                        from {toCustomLocaleString(total)} {currency}
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
                        <span className={styles.footerSpan}>{date}</span>
                        <span className={styles.footerSpan}>{date}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export { BudgetCard };
