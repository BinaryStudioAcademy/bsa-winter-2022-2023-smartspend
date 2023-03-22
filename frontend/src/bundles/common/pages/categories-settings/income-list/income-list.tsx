import { CategoryItem } from '../category-item/category-item';
import { testDB } from '../common/test-database';
import styles from './styles.module.scss';

const IncomeList: React.FC = () => {
    return (
        <div>
            <h2 className={styles.title}>Income Categories</h2>
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

export { IncomeList };
