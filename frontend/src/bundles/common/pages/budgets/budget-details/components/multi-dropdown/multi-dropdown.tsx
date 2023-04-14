import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        value: { id: string }[] | string[];
    };
}): JSX.Element => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    useEffect(() => {
        void dispatch(loadCategories());
    }, [dispatch]);

    const { categoriesSortByType } = useAppSelector(
        (state) => state.categories,
    );

    const budgets = useAppSelector((state) => state.budgets.budgets);
    const currentBudget = budgets.find((budget) => budget.id === id);
    const initialState = currentBudget?.categories;
    const mutableInitialState =
        initialState?.map((item) => ({ ...item, value: item.id })) ?? [];
    const newDataMenu = categoriesSortByType?.expense.map((item) => ({
        ...item,
        value: item.id,
    }));

    const [selectedMulti, setSelectedMulti] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >(mutableInitialState as unknown as DataType[]);

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
                            background: `var(${data.color})`,
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
                data={newDataMenu as DataType[]}
                label={'Budgeted for'}
                selectedOption={selectedMulti}
                handleChange={handleMultiDropdownChangeWrapper}
                labelClassName={styles.dropdownLabel}
            />
        </div>
    );
};

export { RenderMultiDropdown };
