import { useCallback, useState } from 'react';
import { type SingleValue } from 'react-select';

import { Dropdown } from '~/bundles/common/components/components';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from '../../styles.module.scss';

const sex = [
    { value: 'male', name: 'Male' },
    { value: 'female', name: 'Female' },
];

const RenderSex = ({
    field: { onChange, value },
}: {
    field: { onChange: (value: string) => void; value: string | undefined };
}): JSX.Element => {
    const userSex = sex.find((it) => it.value === value);
    const [selectedSingleSex, setSelectedSingleSex] = useState<
        DataType | undefined
    >(userSex);

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
