// import { type TransactionGetAllItemResponseDto } from 'shared/build';

import {
    useAppDispatch,
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
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
    IconSize,
} from '../../enums/enums';
import { CategoryList } from './components/category-list/category-list';
import { FormCategory } from './components/form-category/form-category';
import { FormUiStub } from './components/form-category/form-ui-stub';
import { ManageCategories } from './components/manage-categories/manage-categories';
import styles from './styles.module.scss';

const CategoriesSettings: React.FC = () => {
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
    // const transactions = useAppSelector(state => state.transactions.transactions?.items);
    // const id = useAppSelector(state => state.users.user?.id);

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

    // const transactionCountsByCategory = (
    //     transactions: TransactionGetAllItemResponseDto[] | undefined,
    //     userId: string
    // ): Record<number, number> => {
    //     // if (transactions) {
    //         transactions?.reduce((accumulator, transaction) => {
    //             if (transaction.ownerId === id) {
    //                 const categoryId = transaction.categoryId;
    //                 console.log('categoryId:', categoryId);
    //                 if (categoryId in accumulator) {
    //                     accumulator[categoryId]++;
    //                 } else {
    //                     accumulator[categoryId] = 1;
    //                 }
    //             }
    //             return accumulator;
    //         }, {});
    //     // }
    // };
    // const transactionCountsByCategory = transactions?.reduce((accumulator, transaction) => {
    //     if (transaction.ownerId === id) {
    //         const categoryId = transaction.categoryId;
    //         console.log('categoryId: ', categoryId);
    //         if (categoryId in accumulator) {
    //             accumulator[categoryId]++;
    //         } else {
    //             accumulator[categoryId] = 1;
    //         }
    //     }
    //     return accumulator;
    // }, {});

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
                                <Icon
                                    name={FaIcons.FA_PEN}
                                    width={IconSize.EIGHTEEN}
                                />
                                <span className={styles.btnName}>
                                    Create category
                                </span>
                            </Button>
                        </div>
                        <ManageCategories
                            isSelectedCategories={isSelectedCategories}
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
