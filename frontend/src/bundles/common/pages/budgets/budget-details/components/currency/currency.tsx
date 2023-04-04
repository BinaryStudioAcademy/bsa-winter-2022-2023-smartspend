import { useCallback, useState } from 'react';
import { type SingleValue } from 'react-select';

import { Dropdown } from '~/bundles/common/components/components';
import { type DataType } from '~/bundles/common/types/dropdown.type';

const currency = [
    { value: 'USD', name: 'USD' },
    { value: 'EUR', name: 'EUR' },
];

const RenderCurrency = ({
    field: { onChange },
}: {
    field: { onChange: (value: string) => void };
}): JSX.Element => {
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
    const handleCurrencyChange = useCallback(
        (selectedOption: SingleValue<DataType>): void => {
            if (selectedOption !== null) {
                onChange(selectedOption.value);
                handleDropdownChangeCurrency(selectedOption);
            }
        },
        [handleDropdownChangeCurrency, onChange],
    );
    return (
        <Dropdown
            data={currency}
            handleChange={handleCurrencyChange}
            selectedOption={selectedSingleCurrency}
            label="Account currency"
        />
    );
};

export { RenderCurrency };
