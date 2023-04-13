import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

import { Icon } from '../components';
import styles from './style.module.scss';

type Properties = {
    path?: string;
    body: string;
    icon?: string;
    iconSize?: string;
    margin?: string;
};

const Placeholder: React.FC<Properties> = ({
    path,
    body,
    icon,
    iconSize,
    margin,
}) => {
    return (
        <div className={styles.placeholder} style={{ margin: `${margin}` }}>
            {path ? (
                <img
                    width="200px"
                    height="200px"
                    src={path}
                    alt="dashboard placeholder"
                />
            ) : (
                <Icon name={icon as IconProp} size={iconSize} />
            )}
            <div>{body}</div>
        </div>
    );
};

export { Placeholder };
