import styles from './styles.module.scss';

type Properties = {
    title: string;
    listItems: string[];
};

const StepInfoPanel: React.FC<Properties> = ({ title, listItems }) => {
    return (
        <div className={styles.container} >
            <h1 className={styles.title} >{title}</h1>
            <ul>
                {listItems.map((item, index) => (
                    <li className={styles.list_item} key={index} >{item}</li>
                ))}
            </ul>
        </div>
    );
};

export { StepInfoPanel };
