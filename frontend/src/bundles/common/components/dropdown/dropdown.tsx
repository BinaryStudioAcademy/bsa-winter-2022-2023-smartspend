// import classNames from 'classnames';
import React, { useCallback } from 'react';

import { DropdownType } from '~/bundles/common/enums/enums';

// import styles from './dropdown.module.scss';

type DropdownProperties = {
    // multiple: boolean;
    options: string[];
    type: DropdownType;
    placeholder?: string;
    onChange: (selectedOptions: string[]) => void;
};

const Dropdown: React.FC<DropdownProperties> = ({
    options,
    type = DropdownType.SIMPLE,
    placeholder,
    onChange,
}) => {
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>): void => {
            const selectedOptions: string[] = [];
            const options = event.target.options;
            for (const option of options) {
                if (option.selected) {
                    selectedOptions.push(option.value);
                }
            }
            onChange(selectedOptions);
        },
        [onChange],
    );

    return (
        <select
            // multiple={true}
            className={
                type === DropdownType.MULTISELECT ? 'multiselect' : 'simple'
            }
            // multiple={type === DropdownType.MULTISELECT}
            onChange={handleChange}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export { Dropdown };
