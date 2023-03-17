import { NavLink as Link } from 'react-router-dom';

import { type AppRoute } from '../../../../enums/app-route.enum';
import { useCallback } from '../../../../hooks/hooks';
import { type ValueOf } from '../../../../types/types';
import styles from './styles.module.scss';

type Properties = {
    to: ValueOf<typeof AppRoute>;
    children: React.ReactNode;
};

const NavLink: React.FC<Properties> = ({ to, children }) => {
    type LinkStyleProperties = {
        isActive: boolean;
        isPending: boolean;
    };

    const linkStyle = useCallback(
        ({ isActive }: LinkStyleProperties): string => {
            return isActive ? styles.nav_link_active : styles.nav_link;
        },
        [],
    );

    return (
        <Link className={linkStyle} to={to}>
            {children}
        </Link>
    );
};

export { NavLink };
