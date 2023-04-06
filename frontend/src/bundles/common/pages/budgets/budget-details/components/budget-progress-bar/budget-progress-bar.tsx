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

    return (
        <div className={styles.budgetProgressBar}>
            <div
                className={styles.budgetProgressBarSpent}
                style={{ width: `${percentageSpent}%` }}
            />
            <div
                className={styles.budgetProgressBarRemaining}
                style={{ width: `${percentageRemaining}%` }}
            />
        </div>
    );
};

export { BudgetProgressBar };
