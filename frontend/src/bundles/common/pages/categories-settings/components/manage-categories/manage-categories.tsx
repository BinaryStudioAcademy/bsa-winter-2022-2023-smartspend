import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { BaseModal,Button  } from '~/bundles/common/components/components';
import { ButtonSize, ButtonType, ButtonVariant, FaIcons } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type SelectedCategory = {
    selectedCategory: string[];
};

type RootState = {
    categories: SelectedCategory;
};

const ManageCategories: React.FC = () => {
    const [isMergeModalShown, setIsMergeModalShown] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const isCheckedCategories = useSelector(
        (state: RootState) => state.categories.selectedCategory,
    );

    const handelOpenModalMerge = useCallback(() => {
        setIsMergeModalShown(true);
    }, []);

    const handelClickMerge = useCallback(() => {
        // will be used
    }, []);

    const handelOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handelClickDelete = useCallback(() => {
        // will be used
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsDeleteModalShown(false);
        setIsMergeModalShown(false);
    }, []);

    const buttonIsCheckedCategoriesDeleteActive = isCheckedCategories.length === 0 ? true : false;
    const buttonIsCheckedCategoriesDeleteName = isCheckedCategories.length === 0
        ? 'Delete category'
        : `Delete category ${isCheckedCategories.length}`;
    const buttonIsCheckedCategoriesMergeActive = isCheckedCategories.length >= 2 ? false : true;
    const buttonIsCheckedCategoriesMergeName = isCheckedCategories.length >= 2
        ? `Merge category ${isCheckedCategories.length}`
        : 'Merge category';
    return (
        <>
            <div className={styles.manageWrapper}>
                <h2 className={styles.title}>Manage categories</h2>
                <div className={styles.wrapperAllBtn}>
                    <div className={styles.wrapperBtn}>
                        <Button
                            type={ButtonType.BUTTON}
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            disabled={buttonIsCheckedCategoriesMergeActive}
                            className={styles.btn}
                            onClick={handelOpenModalMerge}
                        >
                            <FontAwesomeIcon icon={FaIcons.COPY} />
                            <span className={styles.btnName}>
                                {buttonIsCheckedCategoriesMergeName}
                            </span>
                        </Button>
                    </div>
                    <div className={styles.wrapperBtn}>
                        <Button
                            type={ButtonType.BUTTON}
                            variant={ButtonVariant.DELETE}
                            size={ButtonSize.MEDIUM}
                            disabled={buttonIsCheckedCategoriesDeleteActive}
                            className={styles.btn}
                            onClick={handelOpenModalDelete}
                        >
                            <FontAwesomeIcon icon={FaIcons.TRASH} />
                            <span className={styles.btnName}>
                                {buttonIsCheckedCategoriesDeleteName}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isMergeModalShown}
                onClose={handleCloseModal}
                onSubmit={handelClickMerge}
                Header={
                    <h2>{`You're about to merge ${isCheckedCategories.length} categories`}</h2>
                }
                Body={<p>Simple modal</p>}
                submitButtonName={'Merge category'}
            />
            <BaseModal
                isShown={isDeleteModalShown}
                onClose={handleCloseModal}
                onSubmit={handelClickDelete}
                Header={
                    <h2>{`You're about to delete ${isCheckedCategories.length} categories`}</h2>
                }
                Body={
                    <p>
                        This change is irreversible. Do you really want to
                        delete them?
                    </p>
                }
                submitButtonName={'Delete category'}
            />
        </>
    );
};

export { ManageCategories };
