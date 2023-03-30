import classNames from 'classnames';

import FacebookIcon from '~/assets/img/facebook-footer-icon.svg';
import SmartSpendLogo from '~/assets/img/logo-smartspend.svg';
import TwitterIcon from '~/assets/img/twitter-footer-icon.svg';
import { AppRoute } from '~/bundles/auth/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { FooterLinks, FooterMediaIcons, Link } from '../components';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
    const linksArray = [
        { to: '#app', value: 'Mobile app' },
        { to: '#about', value: 'About' },
        { to: '#analytics', value: 'Analytics' },
        { to: '#budget', value: 'Smart budget' },
        { to: '#reviews', value: 'Reviews' },
        { to: '#subscription', value: 'Subscription' },
    ] as unknown as { to: ValueOf<typeof AppRoute>; value: string }[];

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
