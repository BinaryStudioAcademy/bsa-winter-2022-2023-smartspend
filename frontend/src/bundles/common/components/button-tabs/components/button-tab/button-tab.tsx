import classNames from 'classnames';
import { useCallback } from 'react';

import styles from '../../styles.module.scss';

type Properties = {
    label: string;
    isActive: boolean;
    disabled: boolean;
    cursor: string;
    onClick?: (event: unknown) => void;
    index: number;
};

const ButtonTab: React.FC<Properties> = ({
    label,
    isActive,
    disabled,
    cursor,
    onClick = (): void => void 0,
    index,
}) => {
    const tabClassName = classNames(styles.tab, {
        [styles.activeTab]: isActive,
    });

    const tabStyles = {
        cursor,
    };

    const clickHandler = useCallback(() => onClick(index), [index, onClick]);

    return (
        <button
            disabled={disabled}
            onClick={clickHandler}
            style={tabStyles}
            className={tabClassName}
        >
            {label}
        </button>
    );
};

export { ButtonTab };
