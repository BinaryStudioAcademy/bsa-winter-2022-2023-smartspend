import React, { useCallback } from 'react';
import Select, {
    type ActionMeta,
    type MultiValue,
    type SingleValue,
    type StylesConfig,
    type ValueContainerProps,
} from 'react-select';
import { components } from 'react-select';

import { type DataTypes } from '../../types/dropdown.type';
import styles from './styles.module.scss';

interface Properties {
    data: DataTypes[];
    selectedOption: MultiValue<DataTypes> | SingleValue<DataTypes>;
    handleChange: (
        selectedOption: MultiValue<DataTypes> | SingleValue<DataTypes>,
        actionMeta: ActionMeta<DataTypes>,
    ) => void;
    width?: string;
}

const MultiDropdown: React.FC<Properties> = ({
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

    const ValueContainer = (
        properties: ValueContainerProps<DataTypes>,
    ): JSX.Element => {
        const { getValue } = properties;
        const selectedCount = getValue().length;
        const labelText =
            selectedCount > 0 ? `${selectedCount} selected` : 'Select items';

        return (
            <components.ValueContainer {...properties}>
                <span className={styles.name}>{labelText}</span>
            </components.ValueContainer>
        );
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
        />
    );
};

export { MultiDropdown };
