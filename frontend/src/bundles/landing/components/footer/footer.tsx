import FacebookIcon from '~/assets/img/facebook-footer-icon.svg';
import SmartSpendLogo from '~/assets/img/logo-smartspend.svg';
import TwitterIcon from '~/assets/img/twitter-footer-icon.svg';

import { AppRoute } from '../../enums/enums';
import { FooterLinks, FooterMediaIcons, Link } from '../components';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
    const linksArray = [
        { to: AppRoute.UI, value: 'PRICING' },
        { to: AppRoute.UI, value: 'Bank connect' },
        { to: AppRoute.UI, value: 'Help' },
        { to: AppRoute.UI, value: 'About Us' },
        { to: AppRoute.UI, value: 'Blog' },
        { to: AppRoute.UI, value: 'Contact' },
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
        <footer className={styles.body}>
            <div className={styles.container}>
                <div className={styles.socialMediaIconsContainer}>
                    <FooterMediaIcons icons={iconsArray} />
                </div>
                <Link to={AppRoute.ROOT} className={styles.logoContainer}>
                    <div className={styles.logoImg}>
                        <img
                            className={styles.imgLogo}
                            src={SmartSpendLogo}
                            alt="logo"
                        />
                    </div>
                    <span className={styles.logoText}>SmartSpend</span>
                </Link>
                <div className={styles.linksContainer}>
                    <FooterLinks links={linksArray} />
                </div>
            </div>
        </footer>
    );
};

export { Footer };
