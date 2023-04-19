import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { CodeHighlight, RangeSlider } from '../components';

const mockData = [
    { amount: -50 },
    { amount: 100 },
    { amount: 350 },
    { amount: 600 },
    { amount: 900 },
];

const codeExample = `
const mockData = [
    { amount: -50 },
    { amount: 100 },
    { amount: 350 },
    { amount: 600 },
    { amount: 900 },
];

const RangeSliderExample: React.FC = () => {
    const rangeLimits = { min: -100, max: 1000 };
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const [filteredData, setFilteredData] = useState(mockData);

    const handleSliderChange = useCallback(
        (range: { min: number; max: number }): void => {
            setCurrentRange(range);

            const newFilteredData = mockData.filter(
                (item) => item.amount >= range.min && item.amount <= range.max,
            );
            setFilteredData(newFilteredData);
        },
        [],
    );
    return (
        <>
            <RangeSlider
                rangeLimits={rangeLimits}
                currentRange={currentRange}
                onChange={handleSliderChange}
            />
            <div>
                <h3>Filtered Data:</h3>
                {filteredData.map((item, index) => (
                    <p key={index}>{item.amount}</p>
                ))}
            </div>
        </>
    );
}

export { RangeSliderExample };
`;

const RangeSliderPart: React.FC = () => {
    const rangeLimits = { min: -100, max: 1000 };
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const [filteredData, setFilteredData] = useState(mockData);

    const handleSliderChange = useCallback(
        (range: { min: number; max: number }): void => {
            setCurrentRange(range);

            const newFilteredData = mockData.filter(
                (item) => item.amount >= range.min && item.amount <= range.max,
            );
            setFilteredData(newFilteredData);
        },
        [],
    );
    return (
        <>
            <CodeHighlight code={codeExample} />
            <RangeSlider
                rangeLimits={rangeLimits}
                currentRange={currentRange}
                onChange={handleSliderChange}
            />
            <div>
                <h3>Filtered Data:</h3>
                {filteredData.map((item, index) => (
                    <p key={index}>{item.amount}</p>
                ))}
            </div>
        </>
    );
};

export { RangeSliderPart };
