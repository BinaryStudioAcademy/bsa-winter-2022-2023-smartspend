import { menuLinks } from '../../enums/enums';
import { Link } from '../components';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
    return (
        <nav className={styles.menu}>
            <ul className={styles.menuList}>
                {menuLinks.map((link, index) => (
                    <li key={index}>
                        <Link to={link.to}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export { Menu };
