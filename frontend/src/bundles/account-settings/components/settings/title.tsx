import styles from './styles.module.scss';

type Properties = {
    children: string;
};
const Title: React.FC<Properties> = ({ children }) => {
    return <h2 className={styles.title}>{children}</h2>;
};

export { Title };
