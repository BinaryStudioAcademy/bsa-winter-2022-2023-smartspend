import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaIcons } from '~/bundles/common/enums/fa-icons.enum';

import styles from '../../styles.module.scss';

type Properties = {
    title: string;
    to: string;
    prefix?: string;
    icon?: string;
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string => {
    return classNames(styles.tab, {
        [styles.active]: isActive,
    });
};

const Tab: React.FC<Properties> = ({ title, to, icon, prefix }) => {
    return (
        <NavLink to={prefix ? `${prefix}${to}` : to} className={getNavLinkClassName}>
            <FontAwesomeIcon
                icon={FaIcons[icon as keyof typeof FaIcons] as IconProp}
                className={styles.icon}
            />
            {title}
        </NavLink>
    );
};

export { Tab };
