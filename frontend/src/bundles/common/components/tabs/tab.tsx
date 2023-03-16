import classNames from 'classnames';
import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import styles from './styles.module.scss';

interface TabProperties {
    title: string;
    to: string;
}

const Tab: React.FC<TabProperties> = ({ title, to }) => {
    const isActive = useMatch({ path: to, end: true });

    return (
        <NavLink
            to={to}
            className={classNames(styles.tab, {
                [styles.active]: isActive,
            })}
        >
            {title}
        </NavLink>
    );
};

export { Tab };
