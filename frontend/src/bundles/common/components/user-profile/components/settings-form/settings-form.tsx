import { Dropdown, Input } from '~/bundles/common/components/components.js';
import { InputType } from '~/bundles/common/enums/enums.js';
import {
    useAppForm,
    useCallback,
    useFormController,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type DataType } from '~/bundles/common/types/types.js';

import { currency, language, mockData, sex } from '../../mock-data.js';
import styles from '../../styles.module.scss';
import { AvatarContainer, SubmitButton, Title } from '../components.js';

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
