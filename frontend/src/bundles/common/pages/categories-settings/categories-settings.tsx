import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as categoriesActions } from '~/bundles/common/stores/categories';

import { Button } from '../../components/button/button';
import { BaseModal } from '../../components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
    IconSize,
} from '../../enums/enums';
import { CategoryList } from './components/category-list/category-list';
import { FormEditCategory } from './components/form-create-category/form-edit-category';
import { FormUi } from './components/form-create-category/form-ui';
import { ManageCategories } from './components/manage-categories/manage-categories';
import styles from './styles.module.scss';

const CategoriesSettings: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isCreateModalShown, setIsCreateModalShown] = useState(false);
    const [isSelectedCategoriesIncome, setIsSelectedCategoriesIncome] =
        useState<string[]>([]);
    const [isSelectedCategoriesExpense, setIsSelectedCategoriesExpense] =
        useState<string[]>([]);
    const handleClickModalCreate = useCallback((): void => {
        setIsCreateModalShown(true);
    }, []);

    useEffect(() => {
        void dispatch(categoriesActions.loadCategories());
    }, [dispatch]);

    const categories = useAppSelector(
        (state) => state.categories.categoriesSortByType ?? {},
    );

    const addIdCheckedCategories = useCallback(
        (id: string, type: string): void => {
            if (type === 'income') {
                setIsSelectedCategoriesIncome((previousState) => {
                    if (previousState.includes(id)) {
                        return previousState.filter(
                            (previousState_) => previousState_ !== id,
                        );
                    }
                    return [...previousState, id];
                });
            }
            setIsSelectedCategoriesExpense((previousState) => {
                if (previousState.includes(id)) {
                    return previousState.filter(
                        (previousState_) => previousState_ !== id,
                    );
                }
                return [...previousState, id];
            });
        },
        [],
    );

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

    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Create a new category</h1>
                    <div>
                        <FormUi
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
                                <FontAwesomeIcon
                                    icon={FaIcons.FA_PEN}
                                    width={IconSize.EIGHTEEN}
                                />
                                <span className={styles.btnName}>
                                    Create category
                                </span>
                            </Button>
                        </div>
                        <ManageCategories
                            isSelectedCategoriesIncome={
                                isSelectedCategoriesIncome
                            }
                            isSelectedCategoriesExpense={
                                isSelectedCategoriesExpense
                            }
                        />
                        <CategoryList
                            title={'Income Categories'}
                            categories={categories.income}
                            addIdCheckedCategories={addIdCheckedCategories}
                        />
                        <CategoryList
                            title={'Expense category'}
                            categories={categories.expense}
                            addIdCheckedCategories={addIdCheckedCategories}
                        />
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isCreateModalShown}
                onClose={handleCloseModal}
                onSubmit={handleCloseModal}
                Header={
                    <h2 className="visually-hidden">
                        {'Create a new category'}
                    </h2>
                }
                Body={
                    <FormEditCategory
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
