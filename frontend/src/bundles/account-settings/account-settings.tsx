import { RouterOutlet } from '../common/components/components';
import { AppRoute } from '../common/enums/app-route.enum';
import { UserSettingsTabs } from './components/components';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER },
        { title: 'All Categories', to: AppRoute.CATEGORIES },
    ];
    return (
        <main className={styles.container}>
            <div className={styles.tabsContainer}>
                <UserSettingsTabs tabsData={dataTabs} />
            </div>
            <div className={styles.userProfileContainer}>
                <RouterOutlet />
            </div>
        </main>
    );
};

export { AccountSettings };
