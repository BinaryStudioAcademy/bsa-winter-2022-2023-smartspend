import { useCallback, useEffect, useMemo, useState } from 'react';
import { type SingleValue } from 'react-select';

import { Dropdown } from '~/bundles/common/components/components';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

const RenderCurrency = ({
    field: { onChange },
}: {
    field: { onChange: (value: string) => void };
}): JSX.Element => {
    const { currencies } = useAppSelector((state) => state.currencies);

    const mutableCurrencies = useMemo(
        () =>
            currencies.map((currency) => ({
                value: currency.shortName,
                name: currency.name,
            })),
        [currencies],
    );

    const [selectedSingleCurrency, setSelectedSingleCurrency] =
        useState<DataType>(mutableCurrencies[0]);

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

    useEffect(() => {
        setSelectedSingleCurrency(mutableCurrencies[0]);
    }, [mutableCurrencies]);

    return (
        <Dropdown
            data={mutableCurrencies}
            handleChange={handleCurrencyChange}
            selectedOption={selectedSingleCurrency}
            label="Сurrency"
            labelClassName={styles.dropdownLabel}
        />
    );
};

export { RenderCurrency };
