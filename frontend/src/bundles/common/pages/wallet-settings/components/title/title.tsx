import React from 'react';

import styles from './styles.module.scss';

type Properties = {
    children: string;
};

const Title: React.FC<Properties> = ({ children }): JSX.Element => {
    return <div className={styles.title}>{children}</div>;
};

export { Title };
