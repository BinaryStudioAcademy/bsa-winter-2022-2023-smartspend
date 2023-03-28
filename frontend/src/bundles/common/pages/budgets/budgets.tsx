import {
    BaseModal,
    BudgetCard,
    Button,
} from '~/bundles/common/components/components.js';
import { ButtonVariant } from '~/bundles/common/enums/enums.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type CardType = {
    id: string;
    title: string;
    total: number;
    moneyLeft: number;
    date: {
        start: string;
        end: string;
    };
};

type Properties = {
    budgetCards?: CardType[];
};

const Budgets: React.FC<Properties> = ({ budgetCards }) => {
    const [active, setActive] = useState(false);

    const handleClickOpen = useCallback((): void => {
        setActive(true);
    }, []);

    const handleClickClose = useCallback((): void => {
        setActive(false);
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
                                id={card.id}
                                title={card.title}
                                total={card.total}
                                moneyLeft={card.moneyLeft}
                                date={card.date}
                            />
                        ))}
                        <Button
                            className={styles.cardCreate}
                            onClick={handleClickOpen}
                        >
                            <div className={styles.cardWrapper}>
                                <Button variant={ButtonVariant.ROUND}>+</Button>
                                <p className={styles.createText}>
                                    Create a New Budget
                                </p>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={active}
                onClose={handleClickClose}
                onSubmit={handleClickClose}
                submitButtonName={'Create budget'}
                Header={'Add new budget'}
                Body={'New budget body...'}
            />
        </div>
    );
};

export { Budgets };
