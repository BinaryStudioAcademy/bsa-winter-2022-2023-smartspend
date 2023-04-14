import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

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
import { actions as categoriesActions } from '~/bundles/common/stores/categories';

import { Checkbox } from '../checkbox/checkbox';
import { FormCategory } from '../form-category/form-category';
import styles from './styles.module.scss';

type Properties = {
    id: string;
    name: string;
    count?: string | number;
    type: string;
    icon: string;
    color: string;
    addIdCheckedCategories: (id: string, type: string) => void;
};

const CategoryItem: React.FC<Properties> = ({
    id,
    name,
    count,
    type,
    icon,
    color,
    addIdCheckedCategories,
}) => {
    const dispatch = useAppDispatch();
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const [isEditModalShown, setIsEditModalShown] = useState(false);
    const [isCheckedItem, setIsCheckedItem] = useState(false);

    const handleCheckboxChange = useCallback(
        (isChecked: boolean): void => {
            setIsCheckedItem(isChecked);
            addIdCheckedCategories(id, type);
        },
        [id, type, addIdCheckedCategories],
    );

    const handleOpenModalEdit = useCallback((): void => {
        setIsEditModalShown(true);
    }, []);

    const handleOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handleClickDelete = useCallback((): void => {
        void dispatch(categoriesActions.removeCategory(id));
        setIsDeleteModalShown(false);
    }, [dispatch, id]);

    const handleCloseModal = useCallback(() => {
        setIsDeleteModalShown(false);
        setIsEditModalShown(false);
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.item}>
                        <div
                            className={classNames(styles.base, styles.checkbox)}
                        >
                            <Checkbox
                                id={id}
                                isChecked={isCheckedItem}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div className={styles.base}>
                            <span
                                className={styles.icon}
                                style={{ background: `var(${color})` }}
                            >
                                <Icon name={icon as IconProp} />
                            </span>
                        </div>
                        <div
                            className={classNames(
                                styles.base,
                                styles.contentWrapper,
                            )}
                        >
                            <div className={styles.content}>
                                <div className={styles.name}>
                                    <span className={styles.text}>{name}</span>
                                </div>
                                <div className={styles.count}>
                                    <span className={styles.text}>
                                        {count === 1 && `${count} transaction`}
                                        {count != 1 &&
                                            `${count ?? 0} transactions`}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={classNames(
                                styles.base,
                                styles.iconWrapper,
                            )}
                        >
                            <Button
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.SECONDARY}
                                size={ButtonSize.SMALL}
                                className={classNames(
                                    styles.iconBtn,
                                    styles.btnEdit,
                                )}
                                disabled={false}
                                onClick={handleOpenModalEdit}
                            >
                                <span className={classNames(styles.btnEdit)}>
                                    <Icon name={FaIcons.GEAR} />
                                </span>
                            </Button>
                        </div>
                        <div
                            className={classNames(
                                styles.base,
                                styles.iconWrapper,
                            )}
                        >
                            <Button
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.DELETE}
                                size={ButtonSize.SMALL}
                                className={styles.iconBtn}
                                disabled={false}
                                onClick={handleOpenModalDelete}
                            >
                                <span>
                                    <Icon name={FaIcons.TRASH} />
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isEditModalShown}
                onClose={handleCloseModal}
                onSubmit={handleCloseModal}
                Header={
                    <h2 className="visually-hidden">{`You're about to edit ${name} categories`}</h2>
                }
                Body={
                    <FormCategory
                        id={id}
                        name={name}
                        type={type}
                        icon={icon}
                        color={color}
                        onClose={handleCloseModal}
                        isCreateModalShown={false}
                    />
                }
                submitButtonName={'Edit category'}
                hasActionButtons={false}
            />
            <BaseModal
                isShown={isDeleteModalShown}
                onClose={handleCloseModal}
                onSubmit={handleClickDelete}
                Header={
                    <h1 className={styles.modalTitle}>
                        You are about to delete category
                    </h1>
                }
                Body={
                    <>
                        <p className={styles.modalDetailsContainer}>
                            This change is irreversible. Do you really want to
                            delete it?
                        </p>
                    </>
                }
                submitButtonName={'Delete category'}
                submitButtonVariant={ButtonVariant.DELETE}
                footerContainerClass={styles.modalFooter}
                buttonsSize={ButtonSize.MEDIUM}
            />
        </div>
    );
};

export { CategoryItem };
