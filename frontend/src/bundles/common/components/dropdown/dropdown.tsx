/* eslint-disable */

import React, { useCallback, useState } from 'react';
import Select, {
    type MultiValue,
    type SingleValue,
    components,
} from 'react-select';

import { type DropdownType } from '../../enums/dropdown-type.enum';

type OptionProperties = {
    id: string;
    value: string;
    label: string | JSX.Element;
};

type Properties = {
    options: OptionProperties[];
    type: DropdownType;
    defaultPlaceholder: string;
    onChange: (
        selectedOptions:
            | SingleValue<OptionProperties>
            | MultiValue<OptionProperties>,
    ) => void;
};

const Option = (properties) => {
    const onchange = useCallback(() => null, []);
    return (
        <div>
            <components.Option {...properties}>
                <input
                    type="checkbox"
                    checked={properties.isSelected}
                    onChange={onchange}
                />{' '}
                <label>{properties.label}</label>
            </components.Option>
        </div>
    );
};

const Dropdown: React.FC<Properties> = ({
    type = 'single',
    defaultPlaceholder,
    options,
    onChange,
}) => {
    const [customPlaceholder, setCustomPlaceholder] =
        useState(defaultPlaceholder);

    const customStyle = {
        dropdownIndicator: (base, state) => ({
            ...base,
            transition: 'all .2s ease',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
        }),
    };

    const handleChange = useCallback(
        (selectedOptions) => {
            onChange(selectedOptions);
            setCustomPlaceholder(
                Array.isArray(selectedOptions) ? (
                    <div>
                        <span>{selectedOptions.length}</span>
                        <span>selected</span>
                    </div>
                ) : (
                    selectedOptions?.label
                ),
            );
        },
        [onChange],
    );

    return (
        <Select
            isMulti={type === 'multi' ? true : false}
            placeholder={customPlaceholder}
            controlShouldRenderValue={false}
            closeMenuOnSelect={type === 'multi' ? false : true}
            hideSelectedOptions={type === 'multi' ? false : true}
            options={options}
            components={type === 'multi' ? { Option } : undefined}
            onChange={handleChange}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={customStyle}
        />
    );
};

export { type OptionProperties, Dropdown };
