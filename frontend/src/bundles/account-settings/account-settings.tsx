import classNames from 'classnames';

import { RouterOutlet } from '../common/components/components.js';
import { AppRoute } from '../common/enums/app-route.enum.js';
import { UserSettingsTabs } from './components/components.js';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER_PROFILE, icon: 'CHART' },
        {
            title: 'Categories settings',
            to: AppRoute.USER_CATEGORIES,
            icon: 'CHART',
        },
    ];

    return (
        <main className={styles.body}>
            <div className={classNames(styles.container, 'container')}>
                <div className={styles.tabsContainer}>
                    <UserSettingsTabs tabsData={dataTabs} />
                </div>
                <div className={styles.userProfileContainer}>
                    <RouterOutlet />
                </div>
            </div>
        </main>
    );
};

export { AccountSettings };
