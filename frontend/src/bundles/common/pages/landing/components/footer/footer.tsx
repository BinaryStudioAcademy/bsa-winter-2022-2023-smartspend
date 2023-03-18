import FacebookIcon from '../../../../../../assets/img/facebook-icon.svg';
import TwitterIcon from '../../../../../../assets/img/twitter-icon.svg';
import { AppRoute } from '../../enums/enums';
import { FooterLinks,FooterMediaIcons } from '../components';
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
        { src: TwitterIcon, alt: 'twitter' },
        { src: FacebookIcon, alt: 'facebook' }
    ];
    return (
        <footer className={styles.container}>
            <div className={styles.social_media_icons_container}>
                <FooterMediaIcons icons={iconsArray} />
            </div>
            <div className={styles.logo_container}>
                <div className={styles.logo__img}>
                    <img src="" alt="logo" />
                </div>
            </div>
            <div className={styles.links_container}>
                {/* <div className={styles.links}>
                    {linksArray.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to}>{link.value}</Link>
                        </li>
                    ))}
                </div> */}
                <FooterLinks links={linksArray} />
            </div>
        </footer>
    );
};

export { Footer };
