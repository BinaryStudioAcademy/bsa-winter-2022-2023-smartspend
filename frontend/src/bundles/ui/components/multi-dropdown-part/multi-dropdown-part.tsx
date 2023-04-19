import { type MultiValue, type SingleValue } from 'react-select';

import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { type DataType } from '~/bundles/common/types/types.js';

import { CodeHighlight, MultiDropdown } from '../components.js';

const people = [
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
        name: 'Charlie Green',
        image: 'https://placekitten.com/54/54',
    },
];

const codeExample = `
const people = [
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
        name: 'Charlie Green',
        image: 'https://placekitten.com/54/54',
    },
];

const MultiDropdownExample: React.FC = () => {
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
    return (
        <MultiDropdown
            data={people}
            selectedOption={selectedMulti}
            handleChange={handleMultiDropdownChange}
            width="229px"
        />
    );
};
`;

const MultiDropdownPart: React.FC = () => {
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
    return (
        <>
            <CodeHighlight code={codeExample} />
            <MultiDropdown
                data={people}
                selectedOption={selectedMulti}
                handleChange={handleMultiDropdownChange}
            />
        </>
    );
};

export { MultiDropdownPart };
