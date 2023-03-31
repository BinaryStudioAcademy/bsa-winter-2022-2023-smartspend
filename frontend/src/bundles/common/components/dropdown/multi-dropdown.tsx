import '~/assets/css/variables/color-variables.scss';

import classNames from 'classnames';
import React, { useCallback } from 'react';
import Select, {
    type ActionMeta,
    type MultiValue,
    type MultiValueProps,
    type SingleValue,
    type StylesConfig,
} from 'react-select';

import { type DataType } from '../../types/dropdown.type';
import styles from './styles.module.scss';

interface Properties {
    data: DataType[];
    selectedOption: MultiValue<DataType> | SingleValue<DataType>;
    handleChange: (
        selectedOption: MultiValue<DataType> | SingleValue<DataType>,
        actionMeta: ActionMeta<DataType>,
    ) => void;
    handleFocus?: () => boolean;
    formatOptionLabel?: (data: DataType) => JSX.Element;
    label?: string;
    labelClassName?: string;
}

const MultiDropdown: React.FC<Properties> = ({
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

    const customStyles: StylesConfig<DataType, true> = {
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
        clearIndicator: (base) => ({
            ...base,
            color: blue500,
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
                <input
                    type="checkbox"
                    checked={(selectedOption as MultiValue<DataType>).some(
                        (option) => option.value === data.value,
                    )}
                    readOnly
                    className={styles.checkbox}
                />

                <img
                    className={styles.image}
                    src={data.image}
                    alt={data.name ?? ''}
                />

                <span className={styles.name}>{data.name}</span>
            </div>
        ),
        [selectedOption],
    );

    const MultiValue: React.FC<MultiValueProps<DataType>> = ({
        getValue,
        index,
        options,
    }) => {
        const length = getValue().length;
        const allSelected = options.length === length;

        if (index !== 0) {
            return null;
        }

        return (
            <>
                {allSelected ? (
                    <span className={styles.circle}>All</span>
                ) : (
                    <span className={styles.circle}>{length}</span>
                )}
                <span className={styles.text}>Selected</span>
            </>
        );
    };

    return (
        <>
            <div className={styles.labelContainer}>
                <span className={labelClasses}>{label}</span>
            </div>
            <Select
                isMulti
                className={styles.select}
                value={selectedOption}
                onChange={handleChange}
                options={options}
                formatOptionLabel={
                    formatOptionLabel ?? defaultFormatOptionLabel
                }
                styles={customStyles}
                components={{
                    MultiValue,
                }}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onFocus={handleFocus}
                isSearchable={false}
            />
        </>
    );
};

export { MultiDropdown };
