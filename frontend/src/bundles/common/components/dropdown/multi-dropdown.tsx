import '~/assets/css/variables/color-variables.scss';

import React, { useCallback } from 'react';
import Select, {
    type ActionMeta,
    type MultiValue,
    type SingleValue,
    type StylesConfig,
    type ValueContainerProps,
} from 'react-select';
import { components } from 'react-select';

import { type DataType } from '../../types/dropdown.type';
import styles from './styles.module.scss';

interface Properties {
    data: DataType[];
    selectedOption: MultiValue<DataType> | SingleValue<DataType>;
    handleChange: (
        selectedOption: MultiValue<DataType> | SingleValue<DataType>,
        actionMeta: ActionMeta<DataType>,
    ) => void;
}

const MultiDropdown: React.FC<Properties> = ({
    data,
    selectedOption,
    handleChange,
}) => {
    const options = data.map((item) => ({
        value: item.value,
        name: item.name,
        image: item.image,
    }));

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
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        control: (provided, state) => ({
            ...provided,
            height: '48px',
            borderColor:
                state.isFocused || state.menuIsOpen
                    ? blue600
                    : provided.borderColor,
            boxShadow:
                state.isFocused || state.menuIsOpen
                    ? 'rgba(105, 137, 254, 0.5) 0 0 10px 0, rgba(60, 100, 244, 0.2) 0 0 0 4px'
                    : provided.boxShadow,
            // '&:hover':
            //     state.isFocused || state.menuIsOpen
            //         ? {
            //               borderColor: blue600,
            //           }
            //         : {
            //               borderColor: provided.borderColor,
            //               boxShadow: provided.boxShadow,
            //           },
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

    const ValueContainer: React.FC<ValueContainerProps<DataType>> = ({
        children,
        ...properties
    }) => {
        const { getValue, hasValue } = properties;
        const length = getValue().length;
        if (!hasValue) {
            return (
                <components.ValueContainer {...properties}>
                    {children}
                </components.ValueContainer>
            );
        }
        return (
            <components.ValueContainer {...properties}>
                {`${length} option/s selected`}
            </components.ValueContainer>
        );
    };

    return (
        <Select
            isMulti
            className={styles.select}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
            components={{
                ValueContainer,
            }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isSearchable={false}
        />
    );
};

export { MultiDropdown };
