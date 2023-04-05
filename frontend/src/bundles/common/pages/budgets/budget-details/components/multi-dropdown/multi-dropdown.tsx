import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { type MultiValue, type SingleValue } from 'react-select';

import { MultiDropdown } from '~/bundles/common/components/components';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

const dataMenu = [
    {
        id: '6b6510e3-7bd9-4952-9db4-e97a03dce2f6',
        name: 'Food & Drink',
        icon: 'burger',
        color: 'red',
        type: 'expense',
    },
    {
        id: '0a478b81-0f6e-4e04-810d-13b18f210954',
        name: 'Salary',
        icon: 'money-bill',
        color: 'green',
        type: 'income',
    },
    {
        id: 'd2303d78-9446-471d-80c2-6966b6ceed3b',
        name: 'Car',
        icon: 'car',
        color: 'blue',
        type: 'expense',
    },
    {
        id: '5a832c55-954e-4def-8196-5854849b1977',
        name: 'Travel',
        icon: 'plane',
        color: 'pink',
        type: 'expense',
    },
    {
        id: 'e4aec229-ff61-49b8-9da8-d4209427ac76',
        name: 'Gifts',
        icon: 'gifts',
        color: 'green',
        type: 'income',
    },
    {
        id: '9ec27eab-1737-44eb-8e7b-56ab214dffc4',
        name: 'Gifts',
        icon: 'gifts',
        color: 'red',
        type: 'expense',
    },
    {
        id: '2debaea0-d8d9-4c3d-9fb4-e1b375b62318',
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
                    <span
                        style={{
                            background: `${data.color}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '25px',
                            width: '25px',
                            borderRadius: '6px',
                            color: '#fff',
                        }}
                    >
                        <FontAwesomeIcon icon={data.icon} />
                    </span>
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
