import fbIcon from '~/assets/img/facebook-icon.svg';
import googleIcon from '~/assets/img/google-icon.svg';
import { getText } from '~/bundles/common/helpers/helpers';

import { Link } from '../components';
import styles from './styles.module.scss';

type Properties = {
    pathname: string;
    authPath: string;
    screen: React.ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ screen, pathname, authPath }) => {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.authContent}>
                <div className={styles.authHeader}>
                    <h2 className={styles.headerTitle}>
                        {getText(pathname, 'title')}
                    </h2>
                    <div className={styles.headerText}>
                        <span>{getText(pathname, 'authText')}</span>
                        <Link className={styles.headerLink} to={authPath}>
                            {getText(pathname, 'authLink')}
                        </Link>
                    </div>
                </div>
                <div className={styles.authBody}>{screen}</div>
                <div className={styles.authFooter}>
                    <p className={styles.footerText}>
                        {getText(pathname, 'footers')}
                    </p>
                    <div className={styles.authSocial}>
                        <img
                            className={styles.socialImg}
                            src={googleIcon}
                            alt="googleIcon"
                        />
                        <img
                            className={styles.socialImg}
                            src={fbIcon}
                            alt="facebookIcon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AuthWrapper };
