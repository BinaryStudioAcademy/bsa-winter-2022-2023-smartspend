import React, { useCallback } from 'react';
import Select, {
    type ActionMeta,
    type MultiValue,
    type SingleValue,
    type StylesConfig,
} from 'react-select';

import { type DataTypes } from '../../types/dropdown.type';
import styles from './styles.module.scss';

interface Properties {
    data: DataTypes[];
    selectedOption: DataTypes;
    handleChange?: (
        selectedOption: SingleValue<DataTypes>,
        actionMeta: ActionMeta<DataTypes>,
    ) => void;
    width?: string;
}

const Dropdown: React.FC<Properties> = ({
    data,
    selectedOption,
    handleChange,
    width = '229px',
}) => {
    const options = data.map((item) => ({
        value: item.value,
        name: item.name,
        image: item.image,
    }));

    const customStyles: StylesConfig<DataTypes> = {
        dropdownIndicator: (base, state) => ({
            ...base,
            cursor: 'pointer',
            padding: '0 8px',
            transform: state.selectProps.menuIsOpen
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
        }),
        container: (provided) => ({
            ...provided,
            width,
        }),
    };

    const formatOptionLabel = useCallback(
        (data: DataTypes): JSX.Element => (
            <div className={styles.item}>
                {data.image && (
                    <img
                        className={styles.image}
                        src={data.image}
                        alt={data.name ?? ''}
                    />
                )}
                {data.name && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [],
    );

    return (
        <Select
            className={styles.select}
            value={{
                value: selectedOption.value,
                name: selectedOption.name,
                image: selectedOption.image,
            }}
            onChange={
                handleChange as unknown as (
                    newValue: SingleValue<DataTypes> | MultiValue<DataTypes>,
                    actionMeta: ActionMeta<DataTypes>,
                ) => void
            }
            options={options}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
        />
    );
};

export { Dropdown };
