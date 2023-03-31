import { SettingsForm, Title } from './components/components.js';
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
