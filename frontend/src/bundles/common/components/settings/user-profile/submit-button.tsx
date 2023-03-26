import styles from '../styles.module.scss';

type Properties = {
    children: string;
    isChange: boolean;
};
const SubmitButton: React.FC<Properties> = ({ children, isChange }) => {
    const className = isChange ? styles.submitBtnActive : styles.submitBtn;
    return (
        <button className={className} type="submit">
            {children}
        </button>
    );
};

export { SubmitButton };
