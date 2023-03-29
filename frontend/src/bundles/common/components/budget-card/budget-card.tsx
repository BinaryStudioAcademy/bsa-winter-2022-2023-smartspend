import { Link } from 'react-router-dom';

import { toCustomLocaleString } from '~/bundles/common/helpers/helpers.js';

import { AppRoute } from '../../enums/app-route.enum';
import styles from './styles.module.scss';

type Properties = {
    id: string;
    title: string;
    total: number;
    moneyLeft: number;
    date: {
        start: string;
        end: string;
    };
};

const BudgetCard: React.FC<Properties> = ({
    id,
    title,
    total,
    moneyLeft,
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
                        {toCustomLocaleString(moneyLeft)} USD
                        <span className={styles.textSpan}>left</span>
                    </p>
                    <p className={styles.text}>
                        from {toCustomLocaleString(total)} USD
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
                        <span className={styles.footerSpan}>{date.start}</span>
                        <span className={styles.footerSpan}>{date.end}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export { BudgetCard };
