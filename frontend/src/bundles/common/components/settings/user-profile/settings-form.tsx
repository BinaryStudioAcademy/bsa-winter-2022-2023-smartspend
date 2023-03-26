import { Input } from '~/bundles/common/components/input/input';
import { Title } from '~/bundles/common/components/settings/title';
import { AvatarContainer } from '~/bundles/common/components/settings/user-profile/avatar-container';
import { SubmitButton } from '~/bundles/common/components/settings/user-profile/submit-button';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useFormController } from '~/bundles/common/hooks/hooks.js';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';

import styles from '../styles.module.scss';
import { mockData } from './mock-data';

const SettingsForm: React.FC = () => {
    const { control, errors } = useAppForm({
        defaultValues: mockData,
    });

    const newName = useFormController({ name: 'name', control }).field.value;
    const newSurname = useFormController({ name: 'surname', control }).field
        .value;
    const newEmail = useFormController({ name: 'email', control }).field.value;
    const isChange = (): boolean => {
        const { name, surname, email } = mockData;
        return newName !== name || newSurname !== surname || newEmail !== email;
    };

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
            />
            <Input
                type={InputType.TEXT}
                label="Surname"
                placeholder="Enter your surname"
                name="surname"
                control={control}
                errors={errors}
            />
            <Input
                type={InputType.EMAIL}
                label="Email"
                placeholder="Enter your email"
                name="email"
                control={control}
                errors={errors}
            />
            <Title>Localization settings</Title>
            <SubmitButton isChange={isChange()}>
                Update my settings
            </SubmitButton>
        </form>
    );
};

export { SettingsForm };
