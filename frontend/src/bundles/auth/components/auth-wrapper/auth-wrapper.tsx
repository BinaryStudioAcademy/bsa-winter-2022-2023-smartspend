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
            </div>
        </div>
    );
};

export { AuthWrapper };
