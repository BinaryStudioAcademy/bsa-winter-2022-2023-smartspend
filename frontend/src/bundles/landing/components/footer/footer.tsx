import classNames from 'classnames';

import SmartSpendLogo from '~/assets/img/logo-smartspend.svg';
import { AppRoute } from '~/bundles/auth/enums/enums.js';
import { Link } from '~/bundles/common/components/components.js';
import { menuLinks } from '~/bundles/common/enums/enums.js';

import { FooterLinks } from './components/components.js';
import styles from './styles.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.body}>
            <div className={classNames('container', styles.container)}>
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
                <div className={styles.links_container}>
                    <FooterLinks links={menuLinks} />
                </div>
            </div>
        </footer>
    );
};

export { Footer };
