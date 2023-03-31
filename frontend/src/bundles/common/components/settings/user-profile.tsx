import { Title } from '~/bundles/common/components/settings/title';
import { SettingsForm } from '~/bundles/common/components/settings/user-profile/settings-form';

import styles from './styles.module.scss';

const UserProfile: React.FC = () => {
    return (
        <div className={styles.userProfile}>
            <Title>Account Settings</Title>
            <SettingsForm />
        </div>
    );
};

export { UserProfile };
