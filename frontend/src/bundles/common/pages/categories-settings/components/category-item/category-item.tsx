import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { categoriesSlice } from '~/bundles/categories/store';
import { BaseModal, Button } from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
    FaIcons,
} from '~/bundles/common/enums/enums';
import { Icon } from '~/bundles/common/helpers/find-icon';

import { Checkbox } from '../checkbox/checkbox';
import { FormEditCategory } from '../form-create-category/form-edit-category';
import styles from './styles.module.scss';

type Properties = {
    id: string;
    categoryName: string;
    count?: string | number;
    type: string;
    iconKey: string;
    colorIcon: string;
};

type SelectedCategory = {
    selectedCategory: string[];
};

type RootState = {
    categories: SelectedCategory;
};

const CategoryItem: React.FC<Properties> = ({
    id,
    categoryName,
    count,
    type,
    iconKey,
    colorIcon,
}) => {
    const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
    const [isEditModalShown, setIsEditModalShown] = useState(false);
    const dispatch = useDispatch();
    const isChecked = useSelector<RootState, boolean>((state) =>
        state.categories.selectedCategory.includes(id),
    );

    const icon = Icon(iconKey);

    const handleCheckboxChange = useCallback(
        (isChecked: boolean): void => {
            if (isChecked) {
                dispatch(categoriesSlice.addSelectedCategory(id));
                return;
            }
            dispatch(categoriesSlice.removeSelectedCategory(id));
        },
        [dispatch, id],
    );

    const handelOpenModalEdit = useCallback((): void => {
        setIsEditModalShown(true);
    }, []);

    const handelClickEdit = useCallback((): void => {
        // will be used
    }, []);

    const handelOpenModalDelete = useCallback(() => {
        setIsDeleteModalShown(true);
    }, []);

    const handelClickDelete = useCallback((): void => {
        setIsDeleteModalShown(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsDeleteModalShown(false);
        setIsEditModalShown(false);
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.item}>
                        <div className={`${styles.base} ${styles.checkbox}`}>
                            <Checkbox
                                id={id}
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div className={styles.base}>
                            <span
                                className={styles.icon}
                                style={{ background: `var(${colorIcon})` }}
                            >
                                {icon}
                            </span>
                        </div>
                        <div
                            className={`${styles.base} ${styles.contentWrapper}`}
                        >
                            <div className={styles.content}>
                                <div className={styles.name}>
                                    <span className={styles.text}>
                                        {categoryName}
                                    </span>
                                </div>
                                <div className={styles.count}>
                                    <span className={styles.text}>
                                        {count} operation
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.base} ${styles.iconWrapper}`}>
                            <Button
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.SECONDARY}
                                size={ButtonSize.SMALL}
                                className={`${styles.iconBtn} ${styles.btnEdit}`}
                                disabled={false}
                                onClick={handelOpenModalEdit}
                            >
                                <span
                                    className={`${styles.btnName} ${styles.btnEdit}`}
                                >
                                    <FontAwesomeIcon icon={FaIcons.GEAR} />
                                </span>
                            </Button>
                        </div>
                        <div className={`${styles.base} ${styles.iconWrapper}`}>
                            <Button
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.DELETE}
                                size={ButtonSize.SMALL}
                                className={styles.iconBtn}
                                disabled={false}
                                onClick={handelOpenModalDelete}
                            >
                                <span className={styles.btnName}>
                                    <FontAwesomeIcon icon={FaIcons.TRASH} />
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <BaseModal
                isShown={isEditModalShown}
                onClose={handleCloseModal}
                onSubmit={handelClickEdit}
                Header={
                    <h2 className="visually-hidden">{`You're about to edit ${categoryName} categories`}</h2>
                }
                Body={
                    <FormEditCategory
                        categoryName={categoryName}
                        type={type}
                        iconKey={iconKey}
                        colorIcon={colorIcon}
                        onClose={handleCloseModal}
                    />
                }
                submitButtonName={'Edit category'}
                hasActionButtons={false}
            />
            <BaseModal
                isShown={isDeleteModalShown}
                onClose={handleCloseModal}
                onSubmit={handelClickDelete}
                Header={
                    <h2>{`You're about to delete ${categoryName} categories`}</h2>
                }
                Body={
                    <p>
                        This change is irreversible. Do you really want to
                        delete them?
                    </p>
                }
                submitButtonName={'Delete category'}
            />
        </div>
    );
};

export { CategoryItem };
