// import { Button } from '../../components/button/button';
import { ExpenseList } from './expense-list/expense-list';
import { FormCreateCategory } from './form-create-category/form-create-category';
import { IncomeList } from './income-list/income-list';
import styles from './styles.module.scss';

const CategoriesSettings: React.FC = () => {
    return (
        <div className={styles.section}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className="visually-hidden">Category Settings</h1>
                    <div>
                        <FormCreateCategory />
                        <div className={styles.manageWrapper}>
                            <h2 className={styles.title}>Manage categories</h2>
                            <div className={styles.btnWrapper}></div>
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
