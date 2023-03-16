import classNames from 'classnames';
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import styles from './tabs.module.scss';

interface TabProperties {
    title: string;
    to: string;
}

const Tab: React.FC<TabProperties> = ({ title, to }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li
            className={classNames(styles.tab, {
                [styles.active]: isActive,
            })}
        >
            <Link to={to}>{title}</Link>
        </li>
    );
};

export { Tab };
