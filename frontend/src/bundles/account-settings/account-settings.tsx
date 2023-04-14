import classNames from 'classnames';

import { storage, StorageKey } from '~/framework/storage/storage.js';

import { RouterOutlet } from '../common/components/components.js';
import { AppDocumentTitles } from '../common/enums/app-document-titles.enum.js';
import { AppRoute } from '../common/enums/app-route.enum.js';
import { useAppDocumentTitle } from '../common/hooks/hooks.js';
import { UserSettingsTabs } from './components/components.js';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    useAppDocumentTitle(AppDocumentTitles.ACCOUNT);
    const haveName = storage.getSync(StorageKey.HAVE_NAME);
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER_PROFILE, icon: 'DASHBOARD' },
        {
            title: 'Categories settings',
            to: AppRoute.USER_CATEGORIES,
            icon: 'GEAR',
        },
    ];

    return (
        <main className={styles.body}>
            <div className={classNames(styles.container, 'container')}>
                {haveName && (
                    <div className={styles.tabsContainer}>
                        <UserSettingsTabs tabsData={dataTabs} />
                    </div>
                )}
                <div className={styles.userProfileContainer}>
                    <RouterOutlet />
                </div>
            </div>
        </main>
    );
};

export { AccountSettings };
