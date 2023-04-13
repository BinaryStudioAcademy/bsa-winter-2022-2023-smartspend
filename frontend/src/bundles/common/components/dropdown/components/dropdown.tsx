/* eslint-disable unicorn/prefer-ternary */
import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Select, { type StylesConfig } from 'react-select';

import { useCallback } from '~/bundles/common/hooks/hooks';
import {
    type DataType,
    type HandleMultiChange,
    type HandleSingleChange,
} from '~/bundles/common/types/types.js';

import styles from '../styles.module.scss';

interface Properties {
    data: DataType[];
    selectedOption: DataType | undefined;
    handleChange: HandleSingleChange;
    handleFocus?: () => boolean;
    formatOptionLabel?: (data: DataType) => JSX.Element;
    label?: string;
    labelClassName?: string;
    name?: string;
    placeholder?: string;
}

const Dropdown: React.FC<Properties> = ({
    data,
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

    const customStyles: StylesConfig<DataType> = {
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
        control: (provided, state) => ({
            ...provided,
            height: '48px',
            width: '100%',
            borderRadius: 'var(--b-2)',
            borderWidth: '0.06rem',
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
                fontSize: '16px',
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
                {data.icon && (
                    <span
                        style={{
                            background: `${data.color}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '25px',
                            width: '25px',
                            borderRadius: '6px',
                            color: '#fff',
                        }}
                    >
                        <FontAwesomeIcon icon={data.icon as IconProp} />
                    </span>
                )}
                {data.name && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [],
    );

    return (
        <div>
            <div className={styles.labelContainer}>
                <span className={labelClasses}>{label}</span>
            </div>
            <Select
                className={styles.select}
                onChange={handleChange as HandleMultiChange}
                options={data}
                formatOptionLabel={
                    formatOptionLabel ?? defaultFormatOptionLabel
                }
                styles={customStyles}
                onFocus={handleFocus}
                isSearchable={false}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
};

export { Dropdown };
