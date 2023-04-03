import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import { ScrollNavLink } from '~/bundles/common/components/components.js';
import { menuLinks } from '~/bundles/common/enums/enums.js';
import { handleScroll } from '~/bundles/common/helpers/helpers.js';
import { type MenuLinksType } from '~/bundles/common/types/types.js';

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
