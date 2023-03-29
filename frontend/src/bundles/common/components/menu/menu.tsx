import classNames from 'classnames';

import { menuLinks } from '~/bundles/common/enums/enums.js';
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

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const toggleMenu = (className: string): string => {
        return isOpen ? className : classNames(className, styles.hide);
    };

    const handleScroll = (): void => {
        let isLastLinkVisible = false;
        const lastLink = menuLinks[menuLinks.length - 1];

        for (const link of menuLinks) {
            // eslint-disable-next-line unicorn/prefer-query-selector
            const element = document.getElementById(link.to);

            if (element) {
                const elementTop =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    80;
                const isLastLink = link === lastLink;
                const isLastLinkVisibleAtBottom =
                    isLastLink &&
                    window.innerHeight + window.pageYOffset >=
                        document.body.offsetHeight;
                const isElementVisible =
                    isLastLinkVisibleAtBottom ||
                    elementTop < window.pageYOffset;

                if (isElementVisible) {
                    setActiveLink(link.to);
                    isLastLinkVisible =
                        link.to === menuLinks[menuLinks.length - 1].to ||
                        isLastLinkVisible;
                }
            }
            if (
                !isLastLinkVisible &&
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight
            ) {
                setActiveLink(menuLinks[menuLinks.length - 1].to);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.scrollTo(0, 0);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <button className={toggleMenu(styles.button)} onClick={handleClick}>
                <span className={styles.line}></span>
            </button>
            <nav className={toggleMenu(styles.menu)}>
                <ul className={toggleMenu(styles.menuList)}>
                    {menuLinks.map((link, index) => (
                        <li key={index} onClickCapture={handleClick}>
                            <ScrollNavLink
                                to={link.to}
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
