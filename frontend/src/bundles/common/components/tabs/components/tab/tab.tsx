import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaIcons } from '~/bundles/common/enums/fa-icons.enum';
import { type TabsData } from '~/bundles/common/types/tabs-data.type';

import styles from '../../styles.module.scss';

type Properties = TabsData;

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string => {
    return classNames(styles.tab, {
        [styles.active]: isActive,
    });
};

const Tab: React.FC<Properties> = ({ title, to, icon, prefix }) => {
    return (
        <NavLink
            to={prefix ? `${prefix}${to}` : (to as string)}
            className={getNavLinkClassName}
        >
            <FontAwesomeIcon
                icon={FaIcons[icon as keyof typeof FaIcons] as IconProp}
                className={styles.icon}
            />
            {title}
        </NavLink>
    );
};

export { Tab };
