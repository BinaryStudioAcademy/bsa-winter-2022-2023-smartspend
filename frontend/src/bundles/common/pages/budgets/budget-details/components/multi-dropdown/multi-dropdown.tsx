import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { type MultiValue, type SingleValue } from 'react-select';

import { MultiDropdown } from '~/bundles/common/components/components';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

const dataMenu = [
    {
        id: '81b40a68-ebb8-4754-aa06-d9bc25a40a7e',
        name: 'Food & Drink',
        icon: 'burger',
        color: 'red',
        type: 'expense',
    },
    {
        id: 'b18e66ff-dec7-4a08-a64a-c1eea7c4df4c',
        name: 'Salary',
        icon: 'money-bill',
        color: 'green',
        type: 'income',
    },
    {
        id: '558f4a63-2ce5-4b40-b8b3-d92f670bea43',
        name: 'Car',
        icon: 'car',
        color: 'blue',
        type: 'expense',
    },
    {
        id: '2713d6e5-3400-4658-86ab-4cea7088eb29',
        name: 'Travel',
        icon: 'plane',
        color: 'pink',
        type: 'expense',
    },
    {
        id: '8d3ab5fc-5894-4357-b43f-55f8bb20063f',
        name: 'Gifts',
        icon: 'gifts',
        color: 'green',
        type: 'income',
    },
    {
        id: '058aa82e-c19c-47b5-9c42-b70fda37cd8f',
        name: 'Gifts',
        icon: 'gifts',
        color: 'red',
        type: 'expense',
    },
    {
        id: '7c52ce0f-6327-4a5c-8008-2f5467a387d4',
        name: 'Bills & Fees',
        icon: 'money-bills',
        color: 'red',
        type: 'expense',
    },
] as DataType[];

const newDataMenu = dataMenu.map((item) => ({
    ...item,
    value: item.id ?? '',
}));

const RenderMultiDropdown = ({
    field: { onChange },
}: {
    field: {
        onChange: (value: SingleValue<DataType[]>) => void;
        value: {
            id: string;
        }[];
    };
}): JSX.Element => {
    const [selectedMulti, setSelectedMulti] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >([]);

    const handleMultiDropdownChange = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            if (selectedOption === null) {
                setSelectedMulti([]);
            } else {
                setSelectedMulti(selectedOption);
            }
        },
        [],
    );

    const handleMultiDropdownChangeWrapper = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            handleMultiDropdownChange(selectedOption);
            let selectedValues = [];
            if (selectedOption !== null) {
                selectedValues = Array.isArray(selectedOption)
                    ? selectedOption.map((option) => option.value)
                    : [selectedOption];
            }
            onChange(selectedValues);
        },
        [handleMultiDropdownChange, onChange],
    );

    const formatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                <input
                    type="checkbox"
                    checked={(selectedMulti as MultiValue<DataType>).some(
                        (option) => option.value === data.value,
                    )}
                    readOnly
                    className={styles.checkbox}
                />

                {data.icon && (
                    <FontAwesomeIcon icon={data.icon} color={data.color} />
                )}
                {data.icon && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [selectedMulti],
    );

    return (
        <div className={styles.multiDropdown}>
            <MultiDropdown
                formatOptionLabel={formatOptionLabel}
                data={newDataMenu}
                label={'Budgeted for'}
                selectedOption={selectedMulti}
                handleChange={handleMultiDropdownChangeWrapper}
            />
        </div>
    );
};

export { RenderMultiDropdown };
