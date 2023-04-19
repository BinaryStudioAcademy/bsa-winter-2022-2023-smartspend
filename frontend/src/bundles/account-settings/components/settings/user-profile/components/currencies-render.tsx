import { useMemo } from 'react';
import { type SingleValue } from 'react-select';

import { Dropdown } from '~/bundles/common/components/components';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from '../../styles.module.scss';

const RenderCurrency = ({
    field: { onChange, value },
}: {
    field: { onChange: (value: string) => void; value: string };
}): JSX.Element => {
    const currencies = useAppSelector((state) => state.currencies.currencies);

    const mutableCurrencies = useMemo(
        () =>
            currencies.map((currency) => ({
                value: currency.shortName,
                name: currency.name,
            })),
        [currencies],
    );

    const userCurrency = mutableCurrencies.find(
        (currencies) => currencies.value === value,
    );

    const [selectedSingleCurrency, setSelectedSingleCurrency] = useState<
        DataType | undefined
    >(userCurrency);

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

    // useEffect(() => {
    //     setSelectedSingleCurrency(userCurrency[0] ?? mutableCurrencies[0]);
    // }, [mutableCurrencies, userCurrency]);

    return (
        <Dropdown
            data={mutableCurrencies}
            handleChange={handleCurrencyChange}
            selectedOption={selectedSingleCurrency}
            label="Account currency"
            labelClassName={styles.dropdownLabel}
        />
    );
};

export { RenderCurrency };
