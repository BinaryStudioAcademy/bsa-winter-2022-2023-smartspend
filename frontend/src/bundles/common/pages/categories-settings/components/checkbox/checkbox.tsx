import classNames from 'classnames';
import { useCallback } from 'react';

import styles from './styles.module.scss';

interface CheckboxProperties {
    id?: string;
    label?: string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProperties> = ({
    id,
    isChecked,
    onChange,
}) => {
    const handleClick = useCallback((): void => {
        const newValue = !isChecked;
        onChange(newValue);
    }, [onChange, isChecked]);
    const onKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>): void => {
            if (event.key === 'Enter') {
                handleClick();
            }
        },
        [handleClick],
    );

    return (
        <div className={styles.checkbox}>
            <div
                className={classNames(
                    styles.box,
                    isChecked ? styles.boxChecked : '',
                )}
                id={id}
                onClick={handleClick}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                <div className={styles.checkboxCheck}></div>
            </div>
        </div>
    );
};

export { Checkbox };
