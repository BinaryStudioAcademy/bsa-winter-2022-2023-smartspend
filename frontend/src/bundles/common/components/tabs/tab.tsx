import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaIcons } from '../../enums/fa-icons.enum';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    to: string;
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string => {
    return classNames(styles.tab, {
        [styles.active]: isActive,
    });
};

const Tab: React.FC<Properties> = ({ title, to }) => {
    return (
        <NavLink to={to} className={getNavLinkClassName}>
            <FontAwesomeIcon icon={FaIcons.CHART} className={styles.icon} />
            {title}
        </NavLink>
    );
};

export { Tab };
