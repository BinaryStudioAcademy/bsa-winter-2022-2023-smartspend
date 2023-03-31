import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { Input } from '~/bundles/common/components/input/input';
import { Title } from '~/bundles/common/components/settings/title';
import { AvatarContainer } from '~/bundles/common/components/settings/user-profile/avatar-container';
import { SubmitButton } from '~/bundles/common/components/settings/user-profile/submit-button';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { useFormController } from '~/bundles/common/hooks/hooks.js';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from '../styles.module.scss';
import { mockData } from './mock-data';

const currency = [
    { value: 'USD', name: 'USD' },
    { value: 'UAH', name: 'UAH' },
];

const language = [
    { value: 'English', name: 'English' },
    { value: 'Ukrainian', name: 'Ukrainian' },
];

const sex = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' },
];

const SettingsForm: React.FC = () => {
    const { control, errors } = useAppForm({
        defaultValues: mockData,
    });

    const newName = useFormController({ name: 'name', control }).field.value;
    const newSurname = useFormController({ name: 'surname', control }).field
        .value;
    const newEmail = useFormController({ name: 'email', control }).field.value;
    const isChange = (): boolean => {
        const { name, surname, email, language, currency, sex } = mockData;
        return (
            newName !== name ||
            newSurname !== surname ||
            newEmail !== email ||
            language !== selectedSingleLanguage.name ||
            currency !== selectedSingleCurrency.name ||
            sex !== selectedSingleSex.name
        );
    };

    const [selectedSingleCurrency, setSelectedSingleCurrency] =
        useState<DataType>(currency[0]);

    const handleDropdownChangeCurrency = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleCurrency(selectedOption);
            }
        },
        [],
    );

    const [selectedSingleLanguage, setSelectedSingleLanguage] =
        useState<DataType>(language[0]);

    const handleDropdownChangeLanguage = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleLanguage(selectedOption);
            }
        },
        [],
    );

    const [selectedSingleSex, setSelectedSingleSex] = useState<DataType>(
        sex[0],
    );

    const handleDropdownChangeSex = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleSex(selectedOption);
            }
        },
        [],
    );

    return (
        <form className={styles.form}>
            <AvatarContainer />
            <Input
                type={InputType.TEXT}
                label="First name"
                placeholder="Enter your name"
                name="name"
                control={control}
                errors={errors}
            />
            <Input
                type={InputType.TEXT}
                label="Last name"
                placeholder="Enter your surname"
                name="surname"
                control={control}
                errors={errors}
            />
            <Dropdown
                data={sex}
                handleChange={handleDropdownChangeSex}
                selectedOption={selectedSingleSex}
                label="Sex"
            />
            <Input
                type={InputType.EMAIL}
                label="E-mail address"
                placeholder="Enter your email"
                name="email"
                control={control}
                errors={errors}
            />
            <Title>Account Settings</Title>
            <Dropdown
                data={currency}
                handleChange={handleDropdownChangeCurrency}
                selectedOption={selectedSingleCurrency}
                label="Account currency"
            />
            <Dropdown
                data={language}
                handleChange={handleDropdownChangeLanguage}
                selectedOption={selectedSingleLanguage}
                label="Language"
            />
            <SubmitButton isChange={isChange()}>
                Update My Settings
            </SubmitButton>
        </form>
    );
};

export { SettingsForm };
