import { useCallback, useState } from 'react';
import { type SingleValue } from 'react-select';

import { Dropdown } from '~/bundles/common/components/components';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from '../../styles.module.scss';

const sex = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' },
];

const RenderSex = ({
    field: { onChange },
}: {
    field: { onChange: (value: string) => void };
}): JSX.Element => {
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

    const handleCurrencyChange = useCallback(
        (selectedOption: SingleValue<DataType>): void => {
            if (selectedOption !== null) {
                onChange(selectedOption.value);
                handleDropdownChangeSex(selectedOption);
            }
        },
        [handleDropdownChangeSex, onChange],
    );

    return (
        <Dropdown
            data={sex}
            handleChange={handleCurrencyChange}
            selectedOption={selectedSingleSex}
            labelClassName={styles.dropdownLabel}
            label="Sex"
        />
    );
};

export { RenderSex };
