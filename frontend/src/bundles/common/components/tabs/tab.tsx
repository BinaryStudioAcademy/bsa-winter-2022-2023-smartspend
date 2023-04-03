import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    to: string;
    prefix?: string;
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string => {
    return classNames(styles.tab, {
        [styles.active]: isActive,
    });
};

const Tab: React.FC<Properties> = ({ title, to, prefix }) => {
    return (
        <NavLink
            to={prefix ? `${prefix}${to}` : to}
            className={getNavLinkClassName}
        >
            {title}
        </NavLink>
    );
};

export { Tab };
