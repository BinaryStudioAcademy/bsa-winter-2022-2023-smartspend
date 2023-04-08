import React from 'react';

import { Button } from '~/bundles/common/components/button/button';
import { Calendar, Icon } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/components/dropdown.js';
import { Input } from '~/bundles/common/components/input/input';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { FaIcons } from '~/bundles/common/enums/fa-icons.enum';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { useFormController } from '~/bundles/common/hooks/hooks.js';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { type DataType } from '~/bundles/common/types/dropdown.type';
import { deleteUser } from '~/bundles/users/store/actions';
import { storage, StorageKey } from '~/framework/storage/storage';

import styles from '../styles.module.scss';
import { AvatarContainer } from './avatar-container';
import { mockData } from './mock-data';
import { SubmitButton } from './submit-button';

const currency = [
    { value: 'USD', name: 'USD' },
    { value: 'UAH', name: 'UAH' },
];

const sex = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' },
];

const SettingsForm: React.FC = () => {
    const { control, errors } = useAppForm({
        defaultValues: mockData,
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();

    const newName = useFormController({ name: 'firstName', control }).field
        .value;
    const newSurname = useFormController({ name: 'lastName', control }).field
        .value;
    const newEmail = useFormController({ name: 'email', control }).field.value;
    const isChange = (): boolean => {
        const { firstName, lastName, email, currency, sex } = mockData;
        return (
            newName !== firstName ||
            newSurname !== lastName ||
            newEmail !== email ||
            currency !== selectedSingleCurrency.name ||
            sex !== selectedSingleSex.name
        );
    };

    const token = storage.getSync(StorageKey.TOKEN);

    const handleDeleteAccount = useCallback(() => {
        void dispatch(deleteUser(token as string));
        void storage.drop(StorageKey.TOKEN);
        void storage.drop(StorageKey.PWA);
    }, [dispatch, token]);

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

            <SubmitButton isChange={isChange()}>
                Update My Settings
            </SubmitButton>
            <div className={styles.dltButton}>
                <Button
                    variant={ButtonVariant.DELETE}
                    size={ButtonSize.MEDIUM}
                    onClick={handleDeleteAccount}
                >
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
