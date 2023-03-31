import classNames from 'classnames';

import { menuLinks } from '~/bundles/common/enums/enums.js';
import { handleScroll } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { ScrollNavLink } from '../components.js';
import styles from './styles.module.scss';

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>('#app');

    const handleClickMenu = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const handleClickLink = useCallback(() => {
        if (isOpen) {
            setIsOpen(false);
        }
    }, [isOpen]);

    const scrollListener = useCallback(
        () => handleScroll(menuLinks, setActiveLink),
        [],
    );

    const toggleMenu = (className: string): string => {
        return isOpen ? className : classNames(className, styles.hide);
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);
        window.scrollTo(0, 0);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, [scrollListener]);

    return (
        <>
            <button
                className={toggleMenu(styles.button)}
                onClick={handleClickMenu}
            >
                <span className={styles.line}></span>
            </button>
            <nav
                className={toggleMenu(styles.menu)}
                onClickCapture={handleClickLink}
            >
                <ul className={toggleMenu(styles.menuList)}>
                    {menuLinks.map((link, index) => (
                        <li key={index} onClickCapture={handleClickLink}>
                            <ScrollNavLink
                                title={link.title}
                                scrollToId={link.to}
                                className={classNames(styles.menuLink, {
                                    [styles.active]: activeLink === link.to,
                                })}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export { Menu };
