import { AppRoute } from '../common/enums/app-route.enum';
import { UserProfile, UserSettingsTabs } from './components/components';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER },
        { title: 'All Categories', to: AppRoute.DASHBOARD },
        { title: 'Connected bank accounts', to: AppRoute.DASHBOARD },
        { title: 'Support', to: AppRoute.DASHBOARD },
        { title: 'Terms and Policies', to: AppRoute.DASHBOARD },
    ];
    return (
        <main className={styles.container}>
            <UserSettingsTabs tabsData={dataTabs} />
            <div className={styles.userProfileContainer}>
                <UserProfile />
            </div>
        </main>
    );
};

export { AccountSettings };
