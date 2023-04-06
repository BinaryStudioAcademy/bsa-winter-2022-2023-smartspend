import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { type MultiValue, type SingleValue } from 'react-select';

import { MultiDropdown } from '~/bundles/common/components/components';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { loadCategories } from '~/bundles/common/stores/categories/actions';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

const RenderMultiDropdown = ({
    field: { onChange },
}: {
    field: {
        onChange: (value: SingleValue<DataType[]>) => void;
        value: {
            id: string;
        }[];
    };
}): JSX.Element => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(loadCategories());
    }, [dispatch]);

    const category = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );
    const newDataMenu = category.map((item) => ({
        ...item,
        value: item.id,
    }));

    const [selectedMulti, setSelectedMulti] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >([]);

    const handleMultiDropdownChange = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            if (selectedOption === null) {
                setSelectedMulti([]);
            } else {
                setSelectedMulti(selectedOption);
            }
        },
        [],
    );

    const handleMultiDropdownChangeWrapper = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            handleMultiDropdownChange(selectedOption);
            let selectedValues = [];
            if (selectedOption !== null) {
                selectedValues = Array.isArray(selectedOption)
                    ? selectedOption.map((option) => option.value)
                    : [selectedOption];
            }
            onChange(selectedValues);
        },
        [handleMultiDropdownChange, onChange],
    );

    const formatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                <input
                    type="checkbox"
                    checked={(selectedMulti as MultiValue<DataType>).some(
                        (option) => option.value === data.value,
                    )}
                    readOnly
                    className={styles.checkbox}
                />

                {data.icon && (
                    <span
                        className={styles.imageWrapper}
                        style={{
                            background: `${data.color}`,
                        }}
                    >
                        <FontAwesomeIcon icon={data.icon as IconProp} />
                    </span>
                )}
                {data.icon && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [selectedMulti],
    );

    return (
        <div className={styles.multiDropdown}>
            <MultiDropdown
                formatOptionLabel={formatOptionLabel}
                data={newDataMenu}
                label={'Budgeted for'}
                selectedOption={selectedMulti}
                handleChange={handleMultiDropdownChangeWrapper}
            />
        </div>
    );
};

export { RenderMultiDropdown };