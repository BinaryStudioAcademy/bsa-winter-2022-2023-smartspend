import React, { useCallback } from 'react';
import Select from 'react-select';

import { type dataTypes } from '../../types/dropdown.type';
import styles from './styles.module.scss';

interface Properties {
    data: dataTypes[];
    selectedOption: dataTypes;
    handleChange?: (option: dataTypes) => void;
}

const Dropdown: React.FC<Properties> = ({
    data,
    selectedOption,
    handleChange,
}) => {
    const options = data.map((item) => ({
        value: item.value,
        name: item.name,
        image: item.image,
    }));

    const formatOptionLabel = useCallback(
        (data: dataTypes): JSX.Element => (
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

    const handleSelectChange = useCallback(
        (selectedOption: dataTypes | null): void => {
            if (handleChange && selectedOption) {
                handleChange({
                    value: selectedOption.value,
                    name: selectedOption.name,
                    image: selectedOption.image,
                });
            }
        },
        [handleChange],
    );

    return (
        <div className={styles.App}>
            <Select
                className={styles.select}
                value={{
                    value: selectedOption.value,
                    name: selectedOption.name,
                    image: selectedOption.image,
                }}
                onChange={handleSelectChange}
                options={options}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    );
};

export { Dropdown };
