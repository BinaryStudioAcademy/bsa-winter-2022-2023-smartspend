import { useCallback, useState } from 'react';
import { type MultiValue, type SingleValue } from 'react-select';

import { MultiDropdown } from '~/bundles/common/components/components';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

const RenderMultiDropdown = ({
    field: { onChange },
}: {
    field: {
        onChange: (value: SingleValue<DataType[]>) => void;
        value: DataType[];
    };
}): JSX.Element => {
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
            onChange(
                selectedOption === null
                    ? []
                    : (Array.isArray(selectedOption)
                    ? selectedOption
                    : [selectedOption]),
            );
        },
        [handleMultiDropdownChange, onChange],
    );

    return (
        <div className={styles.multiDropdown}>
            <MultiDropdown
                data={[
                    {
                        value: 'John Doe',
                        name: 'John Doe',
                        image: 'https://placekitten.com/50/50',
                    },
                    {
                        value: 'Jane Smith',
                        name: 'Jane Smith',
                        image: 'https://placekitten.com/51/51',
                    },
                    {
                        value: 'Alice Johnson',
                        name: 'Alice Johnson',
                        image: 'https://placekitten.com/52/52',
                    },
                    {
                        value: 'Bob Brown',
                        name: 'Bob Brown',
                        image: 'https://placekitten.com/53/53',
                    },
                    {
                        value: 'Charlie Green',
                        name: 'Charlie Green!',
                        image: 'https://placekitten.com/54/54',
                    },
                ]}
                label={'Budgeted for'}
                selectedOption={selectedMulti}
                handleChange={handleMultiDropdownChangeWrapper}
            />
        </div>
    );
};

export { RenderMultiDropdown };
