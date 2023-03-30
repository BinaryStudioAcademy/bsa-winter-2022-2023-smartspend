import { CategoryItem } from '../category-item/category-item';
import styles from './styles.module.scss';

interface Data {
    id: string;
    categoryName: string;
    type: string;
    icon: string;
    colorIcon: string;
}

type Properties = {
    title: string;
    categories: Data[];
};

const CategoryList: React.FC<Properties> = ({ title, categories }) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>{title}</h2>
            {categories.map((item) => (
                <CategoryItem
                    key={item.id}
                    id={item.id}
                    categoryName={item.categoryName}
                    type={item.type}
                    iconKey={item.icon}
                    colorIcon={item.colorIcon}
                />
            ))}
        </div>
    );
};

export { CategoryList };
