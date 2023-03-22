import { CategoryItem } from '../category-item/category-item';
import { testDB } from '../common/test-database';
import styles from './styles.module.scss';

const ExpenseList: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Expense category</h2>
            {testDB.map((item) => (
                <CategoryItem
                    key={item.id}
                    id={item.id}
                    categoryName={item.categoryName}
                    count={item.count}
                    iconKey={item.icon}
                    colorIcon={item.colorIcon}
                />
            ))}
        </div>
    );
};

export { ExpenseList };
