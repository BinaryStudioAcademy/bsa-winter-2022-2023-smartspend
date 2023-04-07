import classNames from 'classnames';

import { AppRoute } from '../common/enums/app-route.enum.js';
import { UserProfile, UserSettingsTabs } from './components/components.js';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER, icon: 'CHART' },
    ];
    return (
        <main className={styles.body}>
            <div className={classNames(styles.container, 'container')}>
                <div className={styles.tabsContainer}>
                    <UserSettingsTabs tabsData={dataTabs} />
                </div>
                <div className={styles.userProfileContainer}>
                    <UserProfile />
                </div>
            </div>
        </main>
    );
};

export { AccountSettings };
