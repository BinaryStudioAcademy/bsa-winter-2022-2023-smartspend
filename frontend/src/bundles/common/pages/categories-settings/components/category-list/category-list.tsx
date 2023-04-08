import { CategoryItem } from '../category-item/category-item';
import styles from './styles.module.scss';

interface Data {
    id: string;
    name: string;
    type: string;
    icon: string;
    color: string;
}

type Properties = {
    title: string;
    categories: Data[];
    addIdCheckedCategories: (id: string, type: string) => void;
};

const CategoryList: React.FC<Properties> = ({
    title,
    categories,
    addIdCheckedCategories,
}) => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>{title}</h2>
            {Array.isArray(categories) && categories.map((item) => (
                <CategoryItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    icon={item.icon}
                    color={item.color}
                    addIdCheckedCategories={addIdCheckedCategories}
                />
            ))}
        </div>
    );
};

export { CategoryList };
