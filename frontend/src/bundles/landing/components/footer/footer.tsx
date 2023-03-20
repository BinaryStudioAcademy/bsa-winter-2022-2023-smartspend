import FacebookIcon from '~/assets/img/facebook-icon.svg';
import TwitterIcon from '~/assets/img/twitter-icon.svg';

import { AppRoute } from '../../enums/enums';
import { FooterLinks, FooterMediaIcons } from '../components';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
    const linksArray = [
        { to: AppRoute.PRICING, value: 'PRICING' },
        { to: AppRoute.BANKS, value: 'Bank connect' },
        { to: AppRoute.HELP, value: 'Help' },
        { to: AppRoute.ABOUT, value: 'About Us' },
        { to: AppRoute.BLOG, value: 'Blog' },
        { to: AppRoute.CONTACT, value: 'Contact' },
    ];

    const iconsArray = [
        { src: TwitterIcon, alt: 'twitter', href: 'https://twitter.com/' },
        {
            src: FacebookIcon,
            alt: 'facebook',
            href: 'https://www.facebook.com/',
        },
    ];
    return (
        <footer className={styles.container}>
            <div className={styles.socialMediaIconsContainer}>
                <FooterMediaIcons icons={iconsArray} />
            </div>
            <div className={styles.logoContainer}>
                <div className={styles.logoImg}>
                    <img src="" alt="logo" />
                </div>
            </div>
            <div className={styles.links_container}>
                <FooterLinks links={linksArray} />
            </div>
        </footer>
    );
};

export { Footer };
