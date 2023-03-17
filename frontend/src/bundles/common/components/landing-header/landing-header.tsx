import { type LinkProperties } from '../../types/nav-link.type';
import { NavLink } from './components/components';
import styles from './styles.module.scss';

interface LandingHeaderProperties {
    links: LinkProperties[];
}

const LandingHeader: React.FC<LandingHeaderProperties> = ({ links }) => {
    return (
        <header className={styles.header_container}>
            <div>Logo</div>
            <nav className={styles.nav_container}>
                {links.map((link, index) => (
                    <NavLink to={link.to} key={index}>
                        {link.value}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
};

export { LandingHeader };
