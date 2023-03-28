import classNames from 'classnames';

import { menuLinks } from '~/bundles/common/enums/enums.js';

import { useCallback, useState } from '../../hooks/hooks';
import { Link } from '../components';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const toggleMenu = (className: string): string => {
        return isOpen ? className : classNames(className, styles.hide);
    };

    return (
        <>
            <button className={toggleMenu(styles.button)} onClick={handleClick}>
                <span className={styles.line}></span>
            </button>
            <nav className={toggleMenu(styles.menu)}>
                <ul className={toggleMenu(styles.menuList)}>
                    {menuLinks.map((link, index) => (
                        <li key={index}>
                            <Link className={styles.menuLink} to={link.to}>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export { Menu };
