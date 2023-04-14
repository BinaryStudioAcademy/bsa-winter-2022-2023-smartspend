import {
    useAppDispatch,
    useAppDocumentTitle,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';
import { actions as transactionsActions } from '~/bundles/common/stores/transactions';

import { Button } from '../../components/button/button';
import { BaseModal, Icon } from '../../components/components';
import {
    AppDocumentTitles,
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
} from '../../enums/enums';
import { transactionCountsByCategory } from '../../helpers/transaction-count-by-category/transaction-count-by-category.helper';
import { CategoryList } from './components/category-list/category-list';
import { FormCategory } from './components/form-category/form-category';
import { FormUiStub } from './components/form-category/form-ui-stub';
import { ManageCategories } from './components/manage-categories/manage-categories';
import styles from './styles.module.scss';

const CategoriesSettings: React.FC = () => {
    useAppDocumentTitle(AppDocumentTitles.CATEGORIES_SETTINGS);
    const dispatch = useAppDispatch();

    const [isCreateModalShown, setIsCreateModalShown] = useState(false);
    const [isSelectedCategories, setIsSelectedCategories] = useState<string[]>(
        [],
    );

    const handleClickModalCreate = useCallback((): void => {
        setIsCreateModalShown(true);
    }, []);

    useEffect(() => {
        void dispatch(categoriesActions.loadCategories());
    }, [dispatch]);

    const categories = useAppSelector(
        (state) => state.categories.categoriesSortByType ?? {},
    );
    const transactions = useAppSelector(
        (state) => state.transactions.transactions?.items,
    );
    const userId = useAppSelector((state) => state.users.user?.userId);

    const addIdCheckedCategories = useCallback((id: string): void => {
        setIsSelectedCategories((previousState) => {
            if (previousState.includes(id)) {
                return previousState.filter(
                    (previousState_) => previousState_ !== id,
                );
            }
            return [...previousState, id];
        });
    }, []);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>): void => {
            if (event.key === 'Enter') {
                handleClickModalCreate();
            }
        },
        [handleClickModalCreate],
    );

    const handleCloseModal = useCallback(() => {
        setIsCreateModalShown(false);
    }, []);

    const countTransaction = transactionCountsByCategory(transactions, userId);

    useEffect(() => {
        void dispatch(transactionsActions.loadTransactions());
    }, [dispatch]);

    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Create a new category</h1>
                    <div>
                        <FormUiStub
                            onClick={handleClickModalCreate}
                            handleKeyDown={handleKeyDown}
                        />
                        <div className={styles.mobileBtn}>
                            <Button
                                onClick={handleClickModalCreate}
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                disabled={false}
                                className={styles.btn}
                            >
                                <Icon name={FaIcons.FA_PEN} />
                                <span className={styles.btnName}>
                                    Create category
                                </span>
                            </Button>
                        </div>
                        <ManageCategories
                            selectedCategories={isSelectedCategories}
                            setSelectedCategories={setIsSelectedCategories}
                        />
                        <CategoryList
                            title={'Income Categories'}
                            categories={categories.income}
                            addIdCheckedCategories={addIdCheckedCategories}
                            count={countTransaction}
                        />
                        <CategoryList
                            title={'Expense Categories'}
                            categories={categories.expense}
                            addIdCheckedCategories={addIdCheckedCategories}
                            count={countTransaction}
                        />
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isCreateModalShown}
                onClose={handleCloseModal}
                onSubmit={handleCloseModal}
                Body={
                    <FormCategory
                        onClose={handleCloseModal}
                        isCreateModalShown={isCreateModalShown}
                    />
                }
                submitButtonName={'Edit category'}
                hasActionButtons={false}
            />
        </div>
    );
};

export { CategoriesSettings };
