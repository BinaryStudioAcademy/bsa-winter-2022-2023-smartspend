import styles from './styles.module.scss';

interface ProgressProperties {
    totalBudget: number;
    spentSoFar: number;
}

const BudgetProgressBar: React.FC<ProgressProperties> = ({
    totalBudget,
    spentSoFar,
}) => {
    const percentageSpent = (spentSoFar / totalBudget) * 100;
    const percentageRemaining = 100 - percentageSpent;
    const percentageToShow = Math.min(percentageSpent, 100).toFixed(1);

    return (
        <div className={styles.budgetProgressBar}>
            <div
                className={styles.budgetProgressBarSpent}
                style={{ width: `${percentageSpent}%` }}
            />
            <div className={styles.percentage}>
                {Math.abs(Number(percentageToShow))}%
            </div>
            <div
                className={styles.budgetProgressBarRemaining}
                style={{ width: `${percentageRemaining}%` }}
            />
        </div>
    );
};

export { BudgetProgressBar };
