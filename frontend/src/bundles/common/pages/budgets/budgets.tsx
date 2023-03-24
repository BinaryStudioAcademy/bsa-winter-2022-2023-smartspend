import { BudgetCard, Button } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';

import { useCallback } from '../../hooks/hooks';
import styles from './styles.module.scss';

type CardType = {
    title: string;
    total: number;
    moneyLeft: number;
};

type Properties = {
    budgetCards?: CardType[];
};

const Budgets: React.FC<Properties> = ({ budgetCards }) => {
    const handleClickCreate = useCallback((): void => {
        // handle create budget
    }, []);

    return (
        <div className={styles.budgets}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Budgets</h1>
                    <div className={styles.cards}>
                        {budgetCards?.map((card, index) => (
                            <BudgetCard
                                key={index}
                                title={card.title}
                                total={card.total}
                                moneyLeft={card.moneyLeft}
                            />
                        ))}
                        <div
                            className={styles.cardCreate}
                            onClickCapture={handleClickCreate}
                        >
                            <div className={styles.cardWrapper}>
                                <Button variant={ButtonVariant.ROUND}>+</Button>
                                <p className={styles.createText}>
                                    Create a New Budget
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Budgets };
