import React from 'react';

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

const SettingsForm: React.FC = () => {
    const { control, errors } = useAppForm({
        defaultValues: mockData,
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
            // language !== selectedSingleLanguage.name ||
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

    // const [selectedSingleLanguage, setSelectedSingleLanguage] =
    //     useState<DataType>(language[0]);

    // const handleDropdownChangeLanguage = useCallback(
    //     (selectedOption: DataType | null) => {
    //         if (selectedOption !== null) {
    //             setSelectedSingleLanguage(selectedOption);
    //         }
    //     },
    //     [],
    // );

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

            <div className={styles.calendar}>
                <div className={styles.label}>Date of birth</div>
                <Calendar isRangeCalendar={false} />
            </div>

            <Input
                type={InputType.EMAIL}
                label="E-mail address"
                labelClassName={styles.inputLabel}
                placeholder="Enter your email"
                name="email"
                control={control}
                errors={errors}
            />

            <Dropdown
                data={currency}
                handleChange={handleDropdownChangeCurrency}
                selectedOption={selectedSingleCurrency}
                label="Account currency"
                labelClassName={styles.dropdownLabel}
            />
            {/* <Dropdown
                data={language}
                handleChange={handleDropdownChangeLanguage}
                selectedOption={selectedSingleLanguage}
                label="Language"
                labelClassName={styles.dropdownLabel}
            /> */}
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
