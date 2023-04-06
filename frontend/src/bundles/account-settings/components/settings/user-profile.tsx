import { type UserUpdateRequestDto } from 'shared/build';

import styles from './styles.module.scss';
import { Title } from './title';
import { SettingsForm } from './user-profile/settings-form';

type Properties = {
    onSubmit?: ((payload: UserUpdateRequestDto) => void) | undefined;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
const UserProfile: React.FC<Properties> = ({ onSubmit = () => {} }) => {
    return (
        <div className={styles.userProfile}>
            <Title>Account Settings</Title>
            <SettingsForm onSubmit={onSubmit} />
        </div>
    );
};

export { UserProfile };
