// import { useState } from '../../hooks/hooks';
import { AppRoute } from '../../enums/app-route.enum';
import { Link } from '../components';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
    return (
        <nav className={styles.menu}>
            <ul className={styles.menu__list}>
                <li>
                    <Link to={AppRoute.ROOT}>Pricing</Link>
                </li>
                <li>
                    <Link to={AppRoute.BANKS}>Bank connect</Link>
                </li>
                <li>
                    <Link to={AppRoute.HELP}>Help</Link>
                </li>
                <li>
                    <Link to={AppRoute.ABOUT}>About us</Link>
                </li>
                <li>
                    <Link to={AppRoute.BLOG}>Blog</Link>
                </li>
                <li>
                    <Link to={AppRoute.CONTACT}>Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export { Menu };
