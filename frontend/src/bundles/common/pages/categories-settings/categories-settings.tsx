import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../components/button/button';
import { BaseModal } from '../../components/components';
import { ButtonSize, ButtonType, ButtonVariant } from '../../enums/enums';
import { CategoryList } from './category-list/category-list';
import { testDB } from './common/test-database';
import { FormCreateCategory } from './form-create-category/form-create-category';
import styles from './styles.module.scss';

type RootState = {
    categories: {
        checkedCategory: string[];
    }
};
interface Data {
    id: string;
    categoryName: string;
    type: string;
    icon: string;
    colorIcon: string;
}

type GroupedData = Record<string, Data[]>;

const CategoriesSettings: React.FC = () => {
    const [modalMerge, setModalMerge] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const checkedCategories = useSelector((state: RootState) => state.categories.checkedCategory);

    const handelOpenModalMerge = useCallback(() => {
        setModalMerge(true);
    }, []);

    const handelClickMerge = useCallback(() => {
        // console.log('merge')
    }, []);
    
    const handelOpenModalDelete = useCallback(() => {
        setModalDelete(true);
    }, []);

    const handelClickDelete = useCallback(() => {
        // console.log('del')
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalDelete(false);
        setModalMerge(false);
    }, []);

    // const sortByType: GroupedData = testDB.reduce((accumulator: GroupedData, current: Data) => {
    //     if (!accumulator[current.type]) {
    //         accumulator[current.type] = [];
    //     }
    //     accumulator[current.type].push(current);
    //     return accumulator;
    // }, {});

    const sortByType: GroupedData = {};
    for (const data of testDB) {
        if (!sortByType[data.type]) {
            sortByType[data.type] = [];
        }
        sortByType[data.type].push(data);
    }

    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className="visually-hidden">Category Settings</h1>
                    <div>
                        <FormCreateCategory />
                        <div className={styles.manageWrapper}>
                            <h2 className={styles.title}>Manage categories</h2>
                            <div className={styles.wrapperAllBtn}>
                                <div className={styles.wrapperBtn}>
                                    <Button
                                        type={ButtonType.BUTTON}
                                        variant={ButtonVariant.SECONDARY}
                                        size={ButtonSize.SMALL}
                                        // disabled={true}
                                        disabled={checkedCategories.length >= 2 ? false : true}
                                        className={styles.btn}
                                        onClick={handelOpenModalMerge}
                                    >
                                        {/* <span>Merge category</span> */}
                                        <span>{checkedCategories.length >= 2 ? `Merge category (${checkedCategories.length})` : 'Merge category'}</span>
                                    </Button>
                                </div>
                                <div className={styles.wrapperBtn}>
                                    <Button
                                        type={ButtonType.BUTTON}
                                        variant={ButtonVariant.DELETE}
                                        size={ButtonSize.SMALL}
                                        // disabled={true}
                                        disabled={checkedCategories.length === 0 ? true : false}
                                        className={styles.btn}
                                        onClick={handelOpenModalDelete}
                                    >
                                            {/* <span>Delete category</span> */}
                                            <span>{ checkedCategories.length === 0 ?  'Delete category' : `Delete category (${checkedCategories.length})`}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <CategoryList title={'Income Categories'} categories={sortByType.income} />
                        <CategoryList title={'Expense category'} categories={sortByType.expense} />
                    </div>
                </div>
            </div>
                <BaseModal
                    isShown={modalMerge}
                    onClose={handleCloseModal}
                    onSubmit={handelClickMerge}
                    Header={<h1>{`You're about to merge ${checkedCategories.length} categories`}</h1>}
                    Body={<p>Simple modal</p>}
                    submitButtonName={'Merge category'}
                />
                <BaseModal
                    isShown={modalDelete}
                    onClose={handleCloseModal}
                    onSubmit={handelClickDelete}
                    Header={<h1>{`You're about to delete ${checkedCategories.length} categories`}</h1>}
                    Body={<p>This change is irreversible. Do you really want to delete them?</p>}
                    submitButtonName={'Delete category'}
                />
        </div>
    );
};

export { CategoriesSettings };
