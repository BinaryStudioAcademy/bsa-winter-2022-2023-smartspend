import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import { ScrollNavLink } from '~/bundles/common/components/components';
import { menuLinks } from '~/bundles/common/enums/enums';
import { handleScroll } from '~/bundles/common/helpers/helpers';
import { type MenuLinksType } from '~/bundles/common/types/menu-link.type';

import styles from './styles.module.scss';

type Properties = {
    links: MenuLinksType[];
};

const FooterLinks: React.FC<Properties> = ({ links }) => {
    const [activeLink, setActiveLink] = useState<string | null>('#app');

    const scrollListener = useCallback(
        () => handleScroll(menuLinks, setActiveLink),
        [],
    );

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);
        window.scrollTo(0, 0);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, [scrollListener]);

    return (
        <div className={styles.links}>
            {links.map((link, index) => (
                <li key={index}>
                    <ScrollNavLink
                        title={link.title}
                        scrollToId={link.to}
                        className={classNames(styles.menuLink, {
                            [styles.active]: activeLink === link.to,
                        })}
                    />
                </li>
            ))}
        </div>
    );
};

export { FooterLinks };
