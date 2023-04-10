import { useAppSelector } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';
import { Title } from './title';
import { SettingsForm } from './user-profile/settings-form';

const UserProfile: React.FC = () => {
    const { user } = useAppSelector(({ users }) => ({
        user: users.user,
        dataStatus: users.dataStatus,
    }));

    return (
        <div className={styles.userProfile}>
            <Title>Account Settings</Title>
            <SettingsForm user={user} />
        </div>
    );
};

export { UserProfile };
