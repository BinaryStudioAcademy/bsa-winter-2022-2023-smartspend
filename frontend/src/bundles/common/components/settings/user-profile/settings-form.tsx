import { Input } from '~/bundles/common/components/input/input';
import { Title } from '~/bundles/common/components/settings/title';
import { AvatarContainer } from '~/bundles/common/components/settings/user-profile/avatar-container';
import { SubmitButton } from '~/bundles/common/components/settings/user-profile/submit-button';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';

import styles from '../styles.module.scss';
import { mockData } from './mock-data';

const SettingsForm: React.FC = () => {
    const { control, errors } = useAppForm({
        defaultValues: mockData,
    });

    return (
        <form className={styles.form}>
            <AvatarContainer />
            <Input
                type={InputType.TEXT}
                label="Name"
                placeholder="Enter your name"
                name="name"
                control={control}
                errors={errors}
                className={styles.input}
            />
            <Input
                type={InputType.TEXT}
                label="Surname"
                placeholder="Enter your surname"
                name="surname"
                control={control}
                errors={errors}
                className={styles.input}
            />
            <Input
                type={InputType.EMAIL}
                label="Email"
                placeholder="Enter your email"
                name="email"
                control={control}
                errors={errors}
                className={styles.input}
            />
            <Title>Localization settings</Title>
            <SubmitButton>Update my settings</SubmitButton>
        </form>
    );
};

export { SettingsForm };
