import logoSmartSpend from '~/assets/img/logo-smartspend.svg';

import { AppRoute } from '../../enums/enums';
import { Link } from '../components';
import styles from './styles.module.scss';

const AuthAppLogo: React.FC = () => {
    return (
        <Link to={AppRoute.ROOT} className={styles.logoLink}>
            <div className={styles.authLogo}>
                <img
                    className={styles.logoImg}
                    src={logoSmartSpend}
                    alt="logo"
                />
            </div>
            <span className={styles.logoText}>SmartSpend</span>
        </Link>
    );
};

export { AuthAppLogo };
