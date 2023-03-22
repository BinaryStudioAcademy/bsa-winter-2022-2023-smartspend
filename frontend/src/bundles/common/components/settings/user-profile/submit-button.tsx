import styles from '../styles.module.scss';

type Properties = {
    children: string;
};
const SubmitButton: React.FC<Properties> = ({ children }) => {
    return (
        <button className={styles.submitBtn} type="submit">
            {children}
        </button>
    );
};

export { SubmitButton };
