import styles from './styles.module.scss';
import { Title } from './title';
import { SettingsForm } from './user-profile/settings-form';

const UserProfile: React.FC = () => {
    return (
        <div className={styles.userProfile}>
            <Title>Account Settings</Title>
            <SettingsForm />
        </div>
    );
};

export { UserProfile };
