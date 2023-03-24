import { toCustomLocaleString } from '~/bundles/common/helpers/helpers.js';

import { useCallback } from '../../hooks/hooks';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    total: number;
    moneyLeft: number;
};

const BudgetCard: React.FC<Properties> = ({ title, total, moneyLeft }) => {
    const handleClickBudget = useCallback((): void => {
        // handle open budget
    }, []);

    const value = Math.round((100 * moneyLeft) / total);

    return (
        <div className={styles.card} onClickCapture={handleClickBudget}>
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
                        <span className={styles.footerSpan}>March 02,2023</span>
                        <span className={styles.footerSpan}>March 02,2023</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { BudgetCard };
