import classNames from 'classnames';

import { useLocation } from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { AppDocumentTitles } from '../common/enums/app-document-titles.enum.js';
import { AppRoute } from '../common/enums/app-route.enum.js';
import { useAppDocumentTitle } from '../common/hooks/hooks.js';
import { CategoriesSettings } from '../common/pages/categories-settings/categories-settings.js';
import { UserProfile, UserSettingsTabs } from './components/components.js';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    useAppDocumentTitle(AppDocumentTitles.ACCOUNT);
    const { pathname } = useLocation();
    const haveName = storage.getSync(StorageKey.HAVE_NAME);
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER_PROFILE, icon: 'DASHBOARD' },
        {
            title: 'Categories settings',
            to: AppRoute.USER_CATEGORIES,
            icon: 'GEAR',
        },
    ];

    const getScreen = (screen: string): React.ReactNode => {
        if (screen.includes(AppRoute.USER_PROFILE)) {
            return <UserProfile />;
        }

        if (screen.includes(AppRoute.USER_CATEGORIES)) {
            return <CategoriesSettings />;
        }
    };

    return (
        <main className={styles.body}>
            <div className={classNames(styles.container, 'container')}>
                {haveName && (
                    <div className={styles.tabsContainer}>
                        <UserSettingsTabs tabsData={dataTabs} />
                    </div>
                )}
                <div className={styles.userProfileContainer}>
                    {getScreen(pathname)}
                </div>
            </div>
        </main>
    );
};

export { AccountSettings };
