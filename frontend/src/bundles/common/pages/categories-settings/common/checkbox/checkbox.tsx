import styles from './styles.module.scss';

interface CheckboxProperties {
    id: string;
    label: string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProperties> = ({
    id,
    label,
    isChecked,
    onChange,
}) => {
    // const handleClick = (id: string): void => {
    //     const newValue = !isChecked;
    //     onChange(newValue);
    //     // console.log(id);
    // };
    // const onKeyDown = (event: { key: string; }): void => {
    //     if (event.key === 'Enter') {
    //         handleClick(id);
    //     }
    // }

    return (
        <div className={styles.checkbox}>
            <div
                className={`${styles.box} ${
                    isChecked ? styles.boxСhecked : ''
                }`}
                // onClick={():void => handleClick(id)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                // onKeyDown={onKeyDown}
            >
                <div className={styles.checkboxСheck}></div>
            </div>
        </div>
    );
};

export { Checkbox };
