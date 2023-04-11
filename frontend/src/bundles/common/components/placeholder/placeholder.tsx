import React from 'react';

import styles from './style.module.scss';

type Properties = {
    path: string;
    body: string;
};

const Placeholder: React.FC<Properties> = ({ path, body }) => {
    return (
        <div className={styles.placeholder}>
            <img
                width="200px"
                height="200px"
                src={path}
                alt="dashboard placeholder"
            />
            <div>{body}</div>
        </div>
    );
};

export { Placeholder };
