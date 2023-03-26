import { useCallback } from 'react';

import { Button } from '../../components/button/button';
import { ButtonSize, ButtonType, ButtonVariant } from '../../enums/enums';
import { ExpenseList } from './expense-list/expense-list';
import { FormCreateCategory } from './form-create-category/form-create-category';
import { IncomeList } from './income-list/income-list';
import styles from './styles.module.scss';

const CategoriesSettings: React.FC = () => {
    
    const handelClickMerge = useCallback(() => {
        // console.log('click Merge')
    }, []);
    
    const handelClickDelete = useCallback(() => {
        // console.log()
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
                                        disabled={false}
                                        className={styles.btn}
                                        onClick={handelClickMerge}
                                        >
                                            <span className={styles.btnName}>Merge category</span>
                                        </Button>
                                </div>
                                <div className={styles.wrapperBtn}>
                                    <Button
                                        type={ButtonType.BUTTON}
                                        variant={ButtonVariant.PRIMARY}
                                        size={ButtonSize.MEDIUM}
                                        disabled={false}
                                        className={styles.btn}
                                        onClick={handelClickDelete}
                                        >
                                            <span className={styles.btnName}>Delete category</span>
                                        </Button>
                                </div>
                            </div>
                        </div>
                        <IncomeList />
                        <ExpenseList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { CategoriesSettings };
