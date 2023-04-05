import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BaseModal, Button } from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
} from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    isSelectedCategoriesIncome: string[];
    isSelectedCategoriesExpense: string[];
};

const ManageCategories: React.FC<Properties> = ({
    isSelectedCategoriesIncome,
    isSelectedCategoriesExpense,
}) => {
    const [isMergeModalShown, setIsMergeModalShown] = useState(false);
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const handleOpenModalMerge = useCallback(() => {
        setIsMergeModalShown(true);
    }, []);

    const handleClickMerge = useCallback(() => {
        // will be used
    }, []);

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleClickDelete = useCallback(() => {
        // will be used
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsDeleteModalShown(false);
        setIsMergeModalShown(false);
    }, []);

    const buttonIsCheckedCategoriesDeleteActive =
        isSelectedCategoriesExpense.length > 0 ||
        isSelectedCategoriesIncome.length > 0
            ? false
            : true;

    const buttonIsCheckedCategoriesDeleteName =
        isSelectedCategoriesIncome.length === 0 &&
        isSelectedCategoriesExpense.length === 0
            ? 'Delete category'
            : `Delete category ${isSelectedCategoriesIncome.length}`;

    const buttonIsCheckedCategoriesMergeActive =
        isSelectedCategoriesExpense.length >= 2 ||
        isSelectedCategoriesIncome.length >= 2
            ? false
            : true;

    const buttonIsCheckedCategoriesMergeName =
        isSelectedCategoriesExpense.length >= 2 ||
        isSelectedCategoriesIncome.length >= 2
            ? `Merge categories ${isSelectedCategoriesIncome.length}`
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
                            onClick={handleOpenModalMerge}
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
                            onClick={handleOpenModalDelete}
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
                onSubmit={handleClickMerge}
                Header={
                    <h2>{`You're about to merge ${isSelectedCategoriesExpense.length} categories`}</h2>
                }
                Body={<p>Simple modal</p>}
                submitButtonName={'Merge category'}
            />
            <BaseModal
                isShown={isDeleteModalShown}
                onClose={handleCloseModal}
                onSubmit={handleClickDelete}
                Header={
                    <h2>{`You're about to delete ${isSelectedCategoriesExpense.length} categories`}</h2>
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
