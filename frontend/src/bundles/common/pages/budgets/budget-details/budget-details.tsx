import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

// import { useLocation } from 'react-router-dom';
import { Calendar } from '~/bundles/common/components/calendar/calendar';
import { Button } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { iconProvider } from '~/bundles/common/icon-provider';

import styles from './styles.module.scss';

enum CardTypes {
    ORIGINALLY = 'Originally',
    SPENT = 'Spent',
    LEFT = 'Left',
    CAN = 'Can',
}

interface CardProperties {
    type: CardTypes;
    total: number;
    currency: string;
}

const Card: React.FC<CardProperties> = ({ type, total, currency }) => {
    let title;
    switch (type) {
        case CardTypes.ORIGINALLY: {
            title = 'Originally Budgeted';
            break;
        }
        case CardTypes.SPENT: {
            title = 'Spent so far';
            break;
        }
        case CardTypes.LEFT: {
            title = 'Money left';
            break;
        }
        case CardTypes.CAN: {
            title = 'You can spend';
            break;
        }
        default: {
            title = '';
        }
    }

    return (
        <div className={classNames(styles.card, `${styles['card' + type]}`)}>
            <span className={styles.title}>{title}</span>
            <span
                className={classNames(
                    styles.total,
                    type === CardTypes.SPENT ? styles.minus : '',
                )}
            >
                {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}{' '}
                {currency}
            </span>
        </div>
    );
};
function calculateBudgetDetails(
    originallyBudgeted: number,
    spentSoFar: number,
): { moneyLeft: number; canSpend: number } {
    const moneyLeft = originallyBudgeted - spentSoFar;
    const canSpend =
        spentSoFar > originallyBudgeted ? 0 : originallyBudgeted - spentSoFar;
    return { moneyLeft, canSpend };
}

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
const BudgetDetails = (): JSX.Element => {
    const originallyBudgeted = 100_000;
    const spentSoFar = 12_500;
    // const { id } = useLocation();
    const { canSpend, moneyLeft } = calculateBudgetDetails(
        originallyBudgeted,
        spentSoFar,
    );
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.calendarWrapper}>
                    <Calendar isRangeCalendar={true} />
                </div>
                <div className={styles.budgetInfoWrapper}>
                    <div className={styles.breadcrumbsWrapper}>
                        <span>Budgets</span>
                        <FontAwesomeIcon icon={iconProvider.faChevronRight} />
                        <div className={styles.breadcrumbsContent}>
                            <span>name</span>
                            <span>All wallets</span>
                        </div>
                        <FontAwesomeIcon icon={iconProvider.faChevronRight} />
                    </div>
                    <div className={styles.editButtonWrapper}>
                        <Button
                            className={styles.editButton}
                            variant={ButtonVariant.SECONDARY}
                        >
                            Edit budget
                        </Button>
                    </div>
                </div>
                <div className={styles.cardsWrapper}>
                    <Card
                        type={CardTypes.ORIGINALLY}
                        total={originallyBudgeted}
                        currency={'$'}
                    />
                    <Card
                        type={CardTypes.SPENT}
                        total={spentSoFar}
                        currency={'$'}
                    />
                    <Card
                        type={CardTypes.LEFT}
                        total={moneyLeft}
                        currency={'$'}
                    />
                    <Card
                        type={CardTypes.CAN}
                        total={canSpend}
                        currency={'$'}
                    />
                </div>
                <div className={styles.progressWrapper}>
                    <div>Budget progress</div>

                    <BudgetProgressBar
                        totalBudget={originallyBudgeted}
                        spentSoFar={spentSoFar}
                    />
                </div>
            </div>
        </div>
    );
};

export { BudgetDetails };
