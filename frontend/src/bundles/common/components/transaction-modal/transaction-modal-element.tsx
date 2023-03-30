import classNames from 'classnames';
import { type ReactElement } from 'react';

import styles from './styles.module.scss';

interface Properties {
    label: string;
    children: ReactElement;
    className?: string;
}

const TransactionModalElement: React.FC<Properties> = ({
    label,
    children,
    className,
}) => {
    const elementClass = classNames(styles.element, className);
    return (
        <div className={elementClass}>
            <span className={styles.labelElement}>{label}</span>
            {children}
        </div>
    );
};

export { TransactionModalElement };
