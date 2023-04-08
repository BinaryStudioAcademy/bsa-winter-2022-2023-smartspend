import React from 'react';

import { Dropdown, Input } from '~/bundles/common/components/components';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';

import styles from './styles.module.scss';

const InputsContainer: React.FC = () => {
    const { control, errors } = useAppForm({
        defaultValues: { name: '', balance: '' },
    });

    const currency = [
        { value: 'USD', name: 'USD' },
        { value: 'UAH', name: 'UAH' },
    ];

    const handleDropdownChangeCurrency = useCallback(() => {
        return null;
    }, []);

    return (
        <div className={styles.inputs_container}>
            <div className={styles.input_name}>
                <Input
                    type={InputType.TEXT}
                    label="Wallet Name"
                    name="name"
                    control={control}
                    errors={errors}
                    placeholder="Wallet name"
                />
            </div>
            <div className={styles.input_balance}>
                <Input
                    type={InputType.NUMBER}
                    label="Initial balance"
                    name="balance"
                    control={control}
                    errors={errors}
                    placeholder="Initial balance"
                />
            </div>
            <div className={styles.input_currency}>
                <Dropdown
                    name="currency"
                    placeholder="USD"
                    data={currency}
                    label="Wallet currency"
                    selectedOption={{ value: 'USD' }}
                    handleChange={handleDropdownChangeCurrency}
                />
            </div>
        </div>
    );
};

export { InputsContainer };
