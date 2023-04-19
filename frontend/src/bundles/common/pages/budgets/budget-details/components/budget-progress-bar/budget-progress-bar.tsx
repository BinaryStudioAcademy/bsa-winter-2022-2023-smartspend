import classNames from 'classnames';

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

    const color = classNames(
        styles.budgetProgressBarRemaining,
        Number(percentageToShow) >= 0 ? '' : styles.redGradient,
    );

    return (
        <div className={styles.budgetProgressBar}>
            <div
                className={styles.budgetProgressBarSpent}
                style={{
                    width: `${percentageSpent > 0 ? percentageSpent : 0}%`,
                }}
            />
            <div className={styles.percentage}>{Number(percentageToShow)}%</div>
            <div
                className={color}
                style={{ width: `${percentageRemaining}%` }}
            />
        </div>
    );
};

export { BudgetProgressBar };
