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
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { actions as categoryActions } from '~/bundles/common/stores/categories';

import styles from './styles.module.scss';

type Properties = {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const ManageCategories: React.FC<Properties> = ({
    selectedCategories,
    setSelectedCategories,
}) => {
    const dispatch = useAppDispatch();

    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleClickDeleteCategories = useCallback(() => {
        void dispatch(categoryActions.removeCategories(selectedCategories));
        setIsDeleteModalShown(false);
        setSelectedCategories([]);
    }, [dispatch, selectedCategories, setSelectedCategories]);

    const handleCloseModal = useCallback(() => {
        setIsDeleteModalShown(false);
    }, []);

    const buttonIsCheckedCategoriesDeleteActive =
        selectedCategories.length <= 0;

    const buttonIsCheckedCategoriesDeleteName =
        selectedCategories.length === 0
            ? 'Delete categories'
            : `Delete categories  (${selectedCategories.length})`;

    return (
        <>
            <div className={styles.manageWrapper}>
                <h2 className={styles.title}>Manage Categories</h2>
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
                onSubmit={handleClickDeleteCategories}
                Header={
                    <h2 className={styles.modalTitle}>
                        {selectedCategories.length === 1 &&
                            `You're about to delete ${selectedCategories.length} category`}
                        {selectedCategories.length != 1 &&
                            `You're about to delete ${selectedCategories.length} categories`}
                    </h2>
                }
                Body={
                    <p className={styles.modalDetailsContainer}>
                        This change is irreversible. Do you really want to
                        delete them?
                    </p>
                }
                submitButtonName={'Delete categories'}
                footerContainerClass={styles.modalFooter}
                submitButtonVariant={ButtonVariant.DELETE}
                buttonsSize={ButtonSize.MEDIUM}
            />
        </>
    );
};

export { ManageCategories };
