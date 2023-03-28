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
    handleFocus?: () => boolean;
    width?: string;
}

const Dropdown: React.FC<Properties> = ({
    data,
    selectedOption,
    handleChange,
    handleFocus,
    width = '229px',
}) => {
    const options = data.map((item) => ({
        value: item.value,
        name: item.name,
        image: item.image,
    }));

    const blue600 = 'var(--color-blue-600)';

    const customStyles: StylesConfig<DataType> = {
        dropdownIndicator: (base, state) => ({
            ...base,
            cursor: 'pointer',
            padding: '0 8px',
            color: blue600,
            transform: state.selectProps.menuIsOpen
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        container: (provided) => ({
            ...provided,
            width,
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor:
                state.isFocused || state.menuIsOpen
                    ? blue600
                    : provided.borderColor,
            boxShadow:
                state.isFocused || state.menuIsOpen
                    ? 'rgba(105, 137, 254, 0.5) 0 0 10px 0, rgba(60, 100, 244, 0.2) 0 0 0 4px'
                    : provided.boxShadow,
            '&:hover':
                state.isFocused || state.menuIsOpen
                    ? {
                          borderColor: blue600,
                      }
                    : {
                          borderColor: provided.borderColor,
                          boxShadow: provided.boxShadow,
                      },
            cursor: 'pointer',
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
