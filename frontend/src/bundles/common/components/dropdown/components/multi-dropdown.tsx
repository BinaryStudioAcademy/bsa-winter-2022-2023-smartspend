import classNames from 'classnames';
import Select, {
    type MultiValue,
    type MultiValueProps,
    type SingleValue,
    type StylesConfig,
} from 'react-select';

import { useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type DataType,
    type HandleMultiChange,
} from '~/bundles/common/types/types.js';

import styles from '../styles.module.scss';

interface Properties {
    data: DataType[];
    selectedOption: MultiValue<DataType> | SingleValue<DataType>;
    handleChange: HandleMultiChange;
    handleFocus?: () => boolean;
    formatOptionLabel?: (data: DataType) => JSX.Element;
    label?: string;
    labelClassName?: string;
    name?: string;
    placeholder?: string;
}

const MultiDropdown: React.FC<Properties> = ({
    data,
    selectedOption,
    handleChange,
    handleFocus,
    formatOptionLabel,
    label,
    labelClassName = '',
    name,
    placeholder,
}) => {
    const labelClasses = classNames(styles.label, labelClassName);

    const blue500 = 'var(--color-blue-500)';
    const blue600 = 'var(--color-blue-600)';

    const customStyles: StylesConfig<DataType, true> = {
        dropdownIndicator: (base, state) => ({
            ...base,
            cursor: 'pointer',
            padding: '0 8px',
            color: blue600,
            transform: state.selectProps.menuIsOpen
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
            ':hover': {
                color: blue600,
            },
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        clearIndicator: (base) => ({
            ...base,
            color: blue600,
        }),
        control: (provided, state) => ({
            ...provided,
            height: '48px',
            width: '100%',
            borderRadius: 'var(--b-2)',
            borderWidth: '1px',
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
                borderColor: state.isFocused
                    ? blue500
                    : 'var(--color-blue-300)',
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
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: 'var(--color-gray-200)',
                fontSize: '16px',
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
        <div>
            <div className={styles.labelContainer}>
                <span className={labelClasses}>{label}</span>
            </div>
            <Select
                isMulti
                className={styles.select}
                value={selectedOption}
                onChange={handleChange}
                options={data}
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
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
};

export { MultiDropdown };
