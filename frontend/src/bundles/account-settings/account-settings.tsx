import { AppRoute } from '../common/enums/app-route.enum';
import { UserProfile, UserSettingsTabs } from './components/components';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER, icon: 'CHART' },
        { title: 'All Categories', to: AppRoute.DASHBOARD, icon: 'CHART' },
        {
            title: 'Connected bank accounts',
            to: AppRoute.DASHBOARD,
            icon: 'CHART',
        },
        { title: 'Support', to: AppRoute.DASHBOARD, icon: 'CHART' },
        { title: 'Terms and Policies', to: AppRoute.DASHBOARD, icon: 'CHART' },
    ];
    return (
        <main className={styles.container}>
            <div className={styles.tabsContainer}>
                <UserSettingsTabs tabsData={dataTabs} />
            </div>
            <div className={styles.userProfileContainer}>
                <UserProfile />
            </div>
        </main>
    );
};

export { AccountSettings };
