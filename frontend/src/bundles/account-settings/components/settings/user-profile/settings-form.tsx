import React from 'react';
import {
    type UserUpdateRequestDto,
    userUpdateRegValidationSchema,
} from 'shared/build';

import { Button } from '~/bundles/common/components/button/button';
import { Calendar, Icon } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/components/dropdown.js';
import { Input } from '~/bundles/common/components/input/input';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { FaIcons } from '~/bundles/common/enums/fa-icons.enum';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { useFormController } from '~/bundles/common/hooks/hooks.js';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from '../styles.module.scss';
import { Title } from '../title';
import { AvatarContainer } from './avatar-container';
import { mockData } from './mock-data';
import { SubmitButton } from './submit-button';

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

// uncomment above code if you want used validation
// type Properties = {
//     onSubmit: (payload: UserUpdateRequestDto) => void;
// };
// const SettingsForm: React.FC<Properties> = ({ onSubmit }) => {
//     const { control, errors, handleSubmit, reset, watch, trigger } =
//         useAppForm<UserUpdateRequestDto>({
//             defaultValues: mockData,
//             validationSchema: userUpdateRegValidationSchema,
//         });
// const inputReset = reset;
//     const handleFormSubmit = useCallback(
//         (event_: React.BaseSyntheticEvent): void => {
//             event_.preventDefault();
//             void trigger();
//             const email = watch('email');
//             const firstName = watch('firstName');
//             const lastName = watch('lastName');
//             if (!email || !firstName || !lastName) {
//                 return;
//             }
//             void handleSubmit(onSubmit)(event_);
//             inputReset && reset();
//         },
//         [handleSubmit, inputReset, onSubmit, reset, trigger, watch],
//     );

const SettingsForm: React.FC = () => {
    const { control, errors } = useAppForm<UserUpdateRequestDto>({
        defaultValues: mockData,
        validationSchema: userUpdateRegValidationSchema,
    });

    const newName = useFormController({ name: 'firstName', control }).field
        .value;
    const newSurname = useFormController({ name: 'lastName', control }).field
        .value;
    const newEmail = useFormController({ name: 'email', control }).field.value;
    const isChange = (): boolean => {
        const { firstName, lastName, email, language, currency, sex } =
            mockData;
        return (
            newName !== firstName ||
            newSurname !== lastName ||
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
            {/* adde onSubmit={handleFormSubmit} in form, if you want submit form */}
            <AvatarContainer />
            <Input
                type={InputType.TEXT}
                labelClassName={styles.inputLabel}
                label="First name"
                placeholder="Enter your name"
                name="firstName"
                control={control}
                errors={errors}
            />
            <Input
                type={InputType.TEXT}
                label="Last name"
                labelClassName={styles.inputLabel}
                placeholder="Enter your surname"
                name="lastName"
                control={control}
                errors={errors}
            />
            <Dropdown
                data={sex}
                handleChange={handleDropdownChangeSex}
                selectedOption={selectedSingleSex}
                label="Sex"
                labelClassName={styles.dropdownLabel}
            />

            <Calendar isRangeCalendar={false} />

            <Input
                type={InputType.EMAIL}
                label="E-mail address"
                labelClassName={styles.inputLabel}
                placeholder="Enter your email"
                name="email"
                control={control}
                errors={errors}
            />
            <Title>Localization settings</Title>
            <Dropdown
                data={currency}
                handleChange={handleDropdownChangeCurrency}
                selectedOption={selectedSingleCurrency}
                label="Account currency"
                labelClassName={styles.dropdownLabel}
            />
            <Dropdown
                data={language}
                handleChange={handleDropdownChangeLanguage}
                selectedOption={selectedSingleLanguage}
                label="Language"
                labelClassName={styles.dropdownLabel}
            />
            <SubmitButton isChange={isChange()}>
                Update My Settings
            </SubmitButton>
            <div className={styles.dltButton}>
                <Button variant={ButtonVariant.DELETE} size={ButtonSize.MEDIUM}>
                    <span className={styles.icon}>
                        <Icon name={FaIcons.TRASH_CAN} />
                    </span>
                    <span>Delete Account</span>
                </Button>
            </div>
        </form>
    );
};

export { SettingsForm };
