import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { actions as budgetsActions } from '~/bundles/budgets/store';
import {
    BaseModal,
    BudgetCard,
    Button,
} from '~/bundles/common/components/components.js';
import { ButtonVariant, FaIcons } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const Budgets: React.FC = () => {
    const dispatch = useAppDispatch();
    const { budgets } = useAppSelector((state) => state.budgets);
    const [active, setActive] = useState(false);

    const handleClickOpen = useCallback((): void => {
        setActive(true);
    }, []);

    const handleClickClose = useCallback((): void => {
        setActive(false);
    }, []);

    useEffect(() => {
        void dispatch(budgetsActions.loadAll());
    }, [dispatch]);

    return (
        <div className={styles.budgets}>
            <div className={classNames(styles.container, 'container')}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Budgets</h1>
                    <div className={styles.cards}>
                        {budgets?.map((card) => (
                            <BudgetCard
                                key={card.id}
                                id={card.id}
                                title={card.name}
                                total={card.amount}
                                moneyLeft={card.amount}
                                date={{
                                    start: card.startDate,
                                    end: card.startDate,
                                }}
                            />
                        ))}
                        <BudgetCard
                            id={'12345'}
                            title={'Four'}
                            total={75_471}
                            moneyLeft={20_456}
                            date={{
                                start: 'March 02, 2023',
                                end: 'March 02, 2023',
                            }}
                        />
                        <div
                            className={styles.cardCreate}
                            onClickCapture={handleClickOpen}
                        >
                            <div className={styles.cardWrapper}>
                                <Button
                                    variant={ButtonVariant.ROUND}
                                    className={styles.button}
                                >
                                    <FontAwesomeIcon
                                        icon={FaIcons.PLUS}
                                        color={'var(--color-white-100)'}
                                    />
                                </Button>
                                <p className={styles.createText}>
                                    Create a New Budget
                                </p>
                            </div>
                        </div>
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
