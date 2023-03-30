import '~/assets/css/variables/color-variables.scss';

import classNames from 'classnames';
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
    formatOptionLabel?: (data: DataType) => JSX.Element;
    label?: string;
    labelClassName?: string;
}

const Dropdown: React.FC<Properties> = ({
    data,
    selectedOption,
    handleChange,
    handleFocus,
    formatOptionLabel,
    label,
    labelClassName = '',
}) => {
    const labelClasses = classNames(styles.label, labelClassName);

    const options = data.map((item) => ({
        value: item.value,
        name: item.name,
        image: item.image,
    }));

    const blue500 = 'var(--color-blue-500)';

    const customStyles: StylesConfig<DataType> = {
        dropdownIndicator: (base, state) => ({
            ...base,
            cursor: 'pointer',
            padding: '0 8px',
            color: blue500,
            transform: state.selectProps.menuIsOpen
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        control: (provided, state) => ({
            ...provided,
            height: '48px',
            width: '100%',
            borderWidth: '0.1rem',
            borderColor:
                state.isFocused || state.menuIsOpen
                    ? blue500
                    : 'var(--color-blue-200)',
            boxShadow:
                state.isFocused || state.menuIsOpen
                    ? '#3242df33 0 0 0 4px;'
                    : provided.boxShadow,
            transition: 'box-shadow 0.2s linear',
            '&:hover': {
                borderColor: state.isFocused ? blue500 : provided.borderColor,
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

    const defaultFormatOptionLabel = useCallback(
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
        <>
            <div className={styles.labelContainer}>
                <span className={labelClasses}>{label}</span>
            </div>
            <Select
                className={styles.select}
                value={{
                    value: selectedOption.value,
                    name: selectedOption.name,
                    image: selectedOption.image,
                }}
                onChange={handleChange as HandleChangeFunction}
                options={options}
                formatOptionLabel={
                    formatOptionLabel ?? defaultFormatOptionLabel
                }
                styles={customStyles}
                onFocus={handleFocus}
                isSearchable={false}
            />
        </>
    );
};

export { Dropdown };
