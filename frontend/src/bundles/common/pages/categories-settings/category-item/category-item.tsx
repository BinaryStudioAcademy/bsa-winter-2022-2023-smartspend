import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { categoriesSlice } from '~/bundles/categories/store';
import { BaseModal, Button } from '~/bundles/common/components/components';
import { ButtonSize, ButtonType, ButtonVariant } from '~/bundles/common/enums/enums';
import { findIcon } from '~/bundles/common/helpers/find-icon';

import { Checkbox } from '../common/checkbox/checkbox';
import styles from './styles.module.scss';

type Properties = {
    id: string;
    categoryName: string;
    count?: string | number;
    iconKey: string;
    colorIcon: string;
};

type RootState = {
    categories: {
        checkedCategory: string[];
    }
};

const CategoryItem: React.FC<Properties> = ({
    id,
    categoryName,
    count,
    iconKey,
    colorIcon,
}) => {
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    // const [editCategory, setEditCategory]= useState({})
    const dispatch = useDispatch();
    const isChecked = useSelector<RootState, boolean>(
        state => state.categories.checkedCategory.includes(id)
    );

    const icon = findIcon(iconKey);

    const handleCheckboxChange = useCallback((isChecked: boolean): void => {
        if (isChecked) {
            dispatch(categoriesSlice.addChecked(id));  
        } else {
            dispatch(categoriesSlice.removeChecked(id));
        }   
    }, [dispatch, id]);

    const handelOpenModalEdit = useCallback((): void => {
        setModalEdit(true);
    }, []);

    const handelClickEdit = useCallback(() => {
        // console.log(id);
    }, []);

    const handelOpenModalDelete = useCallback(()=> {
        setModalDelete(true);
    }, []);

    const handelClickDelete = useCallback((): void => {
        // console.log(id); //delete item from ID
        setModalDelete(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalDelete(false);
        setModalEdit(false);
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.item}>
                        <div className={`${styles.base} ${styles.checkbox}`}>
                            <Checkbox
                                id={id}
                                label=""
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div
                            className={`${styles.base} ${styles.Wrapper} ${styles.iconCategory}`}
                        >
                            <span
                                className={styles.icon}
                                style={{ backgroundColor: colorIcon }}
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
                        <div
                            className={`${styles.base} ${styles.iconWrapper}`}
                        ></div>
                        <div className={`${styles.base} ${styles.iconWrapper}`}>
                            <Button
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.SECONDARY}
                                size={ButtonSize.SMALL}
                                className={styles.iconBtn}
                                disabled={false}
                                onClick={handelOpenModalEdit}
                            >
                                <span className={styles.btnName}>
                                     <FontAwesomeIcon icon={faGear} />
                                </span>
                            </Button>  
                        </div>
                        <div className={`${styles.base} ${styles.iconWrapper}`}>
                            <Button
                                type={ButtonType.BUTTON}
                                variant={ButtonVariant.DELETE}
                                size={ButtonSize.SMALL}
                                className={`${styles.iconBtn} `}
                                disabled={false}
                                onClick={handelOpenModalDelete}
                            >
                                <span className={styles.btnName}>
                                     <FontAwesomeIcon icon={faTrash} />
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay"></div>
            <BaseModal
                    isShown={modalEdit}
                    onClose={handleCloseModal}
                    onSubmit={handelClickEdit}
                    Header={<h1>{`You're about to edit ${categoryName} categories`}</h1>}
                    Body={<p></p>}
                    submitButtonName={'Edit category'}
                />
            <BaseModal
                    isShown={modalDelete}
                    onClose={handleCloseModal}
                    onSubmit={handelClickDelete}
                    Header={<h1>{`You're about to delete ${categoryName} categories`}</h1>}
                    Body={<p>This change is irreversible. Do you really want to delete them?</p>}
                    submitButtonName={'Delete category'}
                />
        </div>
    );
};

export { CategoryItem };