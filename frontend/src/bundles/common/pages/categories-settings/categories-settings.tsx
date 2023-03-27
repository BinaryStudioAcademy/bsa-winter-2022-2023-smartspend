import { useCallback, useState } from 'react';

import { Button } from '../../components/button/button';
import { ButtonSize, ButtonType, ButtonVariant } from '../../enums/enums';
import { ExpenseList } from './expense-list/expense-list';
import { FormCreateCategory } from './form-create-category/form-create-category';
import { IncomeList } from './income-list/income-list';
import styles from './styles.module.scss';

const CategoriesSettings: React.FC = () => {
    // const [checkedItem, setCheckedItem] = useState<string[]>([]);

    const handelClickMerge = useCallback(() => {
        // console.log('click Merge')
    }, []);
    
    const handelClickDelete = useCallback(() => {
        // const countDelete = checkedItem.length
    }, []);

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
                                        variant={ButtonVariant.PRIMARY}
                                        size={ButtonSize.MEDIUM}
                                        disabled={true}
                                        // disabled={checkedItem?.length >= 2 ? false : true}
                                        className={styles.btn}
                                        onClick={handelClickMerge}
                                    >
                                        <span className={styles.btnName}>Merge category</span>
                                        {/* <span className={styles.btnName}>{checkedItem?.length >= 2 ? `Merge category (${checkedItem?.length})` : 'Merge category'}</span> */}
                                        </Button>
                                </div>
                                <div className={styles.wrapperBtn}>
                                    <Button
                                        type={ButtonType.BUTTON}
                                        variant={ButtonVariant.PRIMARY}
                                        size={ButtonSize.MEDIUM}
                                        disabled={true}
                                        // disabled={checkedItem?.length !== 0 ? false : true}
                                        className={`${styles.btn}`}
                                        onClick={handelClickDelete}
                                    >
                                            <span className={styles.btnName}>Delete category</span>
                                            {/* <span className={styles.btnName}>{ checkedItem?.length !== 0 ?  `Delete category (${checkedItem?.length})` : 'Delete category'}</span> */}
                                        </Button>
                                </div>
                            </div>
                        </div>
                        <IncomeList/>
                        {/* <IncomeList setCheckedItem={setCheckedItem}/> */}
                        <ExpenseList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { CategoriesSettings };
