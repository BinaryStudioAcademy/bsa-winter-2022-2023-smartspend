import { type ReactElement } from 'react';

import styles from './styles.module.scss';

interface Properties {
    label: string;
    children: ReactElement;
    className?: string;
}

const TransactionModalElement: React.FC<Properties> = ({ label, children }) => {
    return (
        <div>
            <span className={styles.labelElement}>{label}</span>
            {children}
        </div>
    );
};

export { TransactionModalElement };
