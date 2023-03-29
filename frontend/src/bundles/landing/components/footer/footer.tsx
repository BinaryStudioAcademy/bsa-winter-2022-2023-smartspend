import classNames from 'classnames';

import FacebookIcon from '~/assets/img/facebook-footer-icon.svg';
import TwitterIcon from '~/assets/img/twitter-footer-icon.svg';
import { menuLinks } from '~/bundles/common/enums/menu-links.enum';

import { FooterLinks, FooterMediaIcons } from '../components';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
    const iconsArray = [
        { src: TwitterIcon, alt: 'twitter', href: 'https://twitter.com/' },
        {
            src: FacebookIcon,
            alt: 'facebook',
            href: 'https://www.facebook.com/',
        },
    ];
    return (
        <footer className={styles.body}>
            <div className={classNames('container', styles.container)}>
                <div className={styles.socialMediaIconsContainer}>
                    <FooterMediaIcons icons={iconsArray} />
                </div>
                <div className={styles.logoContainer}>
                    <div className={styles.logoImg}>
                        <img src="" alt="logo" />
                    </div>
                </div>
                <div className={styles.links_container}>
                    <FooterLinks links={menuLinks} />
                </div>
            </div>
        </footer>
    );
};

export { Footer };
