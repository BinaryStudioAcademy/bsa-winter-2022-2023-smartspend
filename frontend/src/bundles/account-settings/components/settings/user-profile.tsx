import { Loader } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/data-status.enum';
import { useAppSelector } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';
import { Title } from './title';
import { SettingsForm } from './user-profile/settings-form';

const UserProfile: React.FC = () => {
    const { user, dataStatus } = useAppSelector((state) => state.users);

    return (
        <div className={styles.userProfile}>
            <Title>Account Settings</Title>
            {dataStatus === DataStatus.PENDING ? (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            ) : (
                <SettingsForm user={user} />
            )}
        </div>
    );
};

export { UserProfile };
