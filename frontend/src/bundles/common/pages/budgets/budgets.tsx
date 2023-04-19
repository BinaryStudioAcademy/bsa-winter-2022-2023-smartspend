import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { actions as budgetsActions } from '~/bundles/budgets/store';
import {
    BudgetCard,
    Button,
    Loader,
} from '~/bundles/common/components/components.js';
import {
    AppDocumentTitles,
    ButtonVariant,
    DataStatus,
    FaIcons,
} from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppDocumentTitle,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';

import { BudgetModal } from './budget-details/components/components';
import styles from './styles.module.scss';

const Budgets: React.FC = () => {
    const dispatch = useAppDispatch();
    const { budgets, dataStatus } = useAppSelector((state) => state.budgets);

    const { user } = useAppSelector((state) => state.users);
    useAppDocumentTitle(AppDocumentTitles.BUDGETS);
    const [active, setActive] = useState(false);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);
    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    useEffect(() => {
        void dispatch(budgetsActions.loadAll());
        void dispatch(categoriesActions.loadCategories());
    }, [dispatch]);

    return (
        <div className={styles.budgets}>
            <div className={classNames(styles.container, 'container')}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Budgets</h1>
                    {dataStatus === DataStatus.PENDING ? (
                        <div className={styles.loaderContainer}>
                            <Loader />
                        </div>
                    ) : (
                        <div className={styles.cards}>
                            {budgets.map((budget) => (
                                <BudgetCard
                                    key={budget.id}
                                    budget={budget}
                                    currency={user?.currency as string}
                                />
                            ))}
                            <div
                                className={styles.cardCreate}
                                onClickCapture={handleModal}
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
                    )}
                </div>
            </div>
            <div className={styles.modal}>
                <BudgetModal isShown={active} onClose={handleCancel} />
            </div>
        </div>
    );
};

export { Budgets };
