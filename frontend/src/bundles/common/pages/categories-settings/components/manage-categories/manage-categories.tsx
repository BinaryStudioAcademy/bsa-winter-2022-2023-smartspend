import {
    BaseModal,
    Button,
    Icon,
} from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
} from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    isSelectedCategories: string[];
};

const ManageCategories: React.FC<Properties> = ({ isSelectedCategories }) => {
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleClickDelete = useCallback(() => {
        // will be used
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsDeleteModalShown(false);
    }, []);

    const buttonIsCheckedCategoriesDeleteActive =
        isSelectedCategories.length > 0 ? false : true;

    const buttonIsCheckedCategoriesDeleteName =
        isSelectedCategories.length === 0
            ? 'Delete category'
            : `Delete category ${isSelectedCategories.length}`;

    return (
        <>
            <div className={styles.manageWrapper}>
                <h2 className={styles.title}>Manage categories</h2>
                <div className={styles.wrapperAllBtn}>
                    <div className={styles.wrapperBtn}>
                        <Button
                            type={ButtonType.BUTTON}
                            variant={ButtonVariant.DELETE}
                            size={ButtonSize.MEDIUM}
                            disabled={buttonIsCheckedCategoriesDeleteActive}
                            className={styles.btn}
                            onClick={handleOpenModalDelete}
                        >
                            <Icon name={FaIcons.TRASH} />
                            <span className={styles.btnName}>
                                {buttonIsCheckedCategoriesDeleteName}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isDeleteModalShown}
                onClose={handleCloseModal}
                onSubmit={handleClickDelete}
                Header={
                    <h2>{`You're about to delete ${isSelectedCategories.length} categories`}</h2>
                }
                Body={
                    <>
                        <p>
                            This change is irreversible. Do you really want to
                            delete them?
                        </p>
                        <Button
                            type={ButtonType.BUTTON}
                            variant={ButtonVariant.DELETE}
                            size={ButtonSize.MEDIUM}
                            disabled={buttonIsCheckedCategoriesDeleteActive}
                            className={styles.btn}
                            onClick={handleOpenModalDelete}
                        >
                            <Icon name={FaIcons.TRASH} />
                            <span className={styles.btnName}>
                                {buttonIsCheckedCategoriesDeleteName}
                            </span>
                        </Button>
                    </>
                }
                submitButtonName={'Delete category'}
                hasActionButtons={false}
            />
        </>
    );
};

export { ManageCategories };
