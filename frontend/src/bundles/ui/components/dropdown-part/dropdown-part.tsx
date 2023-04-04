import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { type DataType } from '~/bundles/common/types/types.js';

import { CodeHighlight, Dropdown } from '../components';

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

const DropdownExample: React.FC = () => {
    const [selectedSingle, setSelectedSingle] = useState<DataType>(people[0]);

    const handleDropdownChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingle(selectedOption);
            }
        },
        [],
    );
    return (
        <Dropdown
            data={people}
            selectedOption={selectedSingle}
            handleChange={handleDropdownChange}
            width="229px"
        />
    );
};

export { DropdownExample };
`;

const DropdownPart: React.FC = () => {
    const [selectedSingle, setSelectedSingle] = useState<DataType>(people[0]);

    const handleDropdownChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingle(selectedOption);
            }
        },
        [],
    );
    return (
        <>
            <CodeHighlight code={codeExample} />
            <Dropdown
                data={people}
                selectedOption={selectedSingle}
                handleChange={handleDropdownChange}
            />
        </>
    );
};

export { DropdownPart };
