import '~/assets/css/variables/color-variables.scss';

import React, { useCallback } from 'react';
import Select, {
    type ActionMeta,
    type SingleValue,
    type StylesConfig,
} from 'react-select';

import {
    type DataType,
    type HandleChangeFunction,
} from '../../types/dropdown.type';
import styles from './styles.module.scss';

interface Properties {
    data: DataType[];
    selectedOption: DataType;
    handleChange?: (
        selectedOption: SingleValue<DataType>,
        actionMeta: ActionMeta<DataType>,
    ) => void;
    handleFocus?: () => void;
    width?: string;
}

const Dropdown: React.FC<Properties> = ({
    data,
    selectedOption,
    handleChange,
    handleFocus,
    width,
}) => {
    const options = data.map((item) => ({
        value: item.value,
        name: item.name,
        image: item.image,
    }));

    const customStyles: StylesConfig<DataType> = {
        dropdownIndicator: (base, state) => ({
            ...base,
            cursor: 'pointer',
            padding: '0 8px',
            transform: state.selectProps.menuIsOpen
                ? 'rotate(1801deg)'
                : 'rotate(0deg)',
        }),
        container: (provided) => ({
            ...provided,
            width,
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor: provided.borderColor,
            boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        }),

        option: (base, { isSelected }) => {
            const backgroundColor = base.color;
            const fontWeight = isSelected ? 'bold' : 'normal';

            return {
                ...base,
                backgroundColor,
                ':hover': {
                    backgroundColor: 'var(--color-blue-100)',
                },
                fontWeight,
                ':active': {
                    backgroundColor: base.color,
                },
            };
        },
        menu: (provided) => ({
            ...provided,
            width: 'fit-content',
        }),
    };

    const formatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
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
            onChange={handleChange as HandleChangeFunction}
            options={options}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
            onFocus={handleFocus}
        />
    );
};

export { Dropdown };
