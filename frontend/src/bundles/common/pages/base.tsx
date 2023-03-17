import React, { useState } from 'react';

import { Button } from '../components/components';
import { DoughnutChart } from '../components/doughnut-chart/doughnut-chart';
import { RangeSlider } from '../components/range-slider/range-slider';
import { ButtonSize } from '../enums/button-size.enum';
import { ButtonVariant } from '../enums/button-variant.enum';
import { useCallback } from '../hooks/hooks';

const categories = [
    // props to Doughnut Chart
    {
        total: 1150,
        color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
    },
    {
        total: 1825,
        color: 'linear-gradient(96.2deg, #FECC66 -30.03%, #F83062 95.13%)',
    },
    {
        total: 1325,
        color: 'linear-gradient(96.2deg, #FE66E6 -30.03%, #6933DD 95.13%)',
    },
    {
        total: 2425,
        color: 'linear-gradient(91.64deg, #FCE302 -1.67%, #FE5C01 98.41%)',
    },
    {
        total: 1425,
        color: 'linear-gradient(95.77deg, #09F2D6 -14.06%, #09E1FF 101.51%)',
    },
    {
        total: 2225,
        color: 'linear-gradient(95.77deg, #00D7BD -14.06%, #03BFD9 101.51%)',
    },
];

// mock data for range slider

const mockData = [
    { amount: -50 },
    { amount: 100 },
    { amount: 350 },
    { amount: 600 },
    { amount: 900 },
];

const Base: React.FC = () => {
    // Range Slider -------------------------------------
    const [currentRange, setCurrentRange] = useState({ min: -100, max: 1000 });
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
    // end-Range Slider ----------------------------------

    return (
        <div>
            Base Page
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '20px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.MEDIUM}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.SMALL}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.SMALL}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.SMALL}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.SMALL}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.PLAIN}
                            size={ButtonSize.SMALL}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.PLAIN}
                            size={ButtonSize.SMALL}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button variant={ButtonVariant.ROUND}>+</Button>
                    </div>
                </div>
            </div>
            {/* Doughnut Chart----------------------------------- */}
            <div>
                <p>Doughnut Chart</p>
                <DoughnutChart categories={categories} />
            </div>
            {/* end-Doughnut Chart------------------------------- */}
            {/* Range Slider------------------------------------- */}
            <RangeSlider
                currentRange={currentRange}
                onChange={handleSliderChange}
            />
            <ul>
                {filteredData.map((operation, index) => (
                    <li key={index}>{operation.amount}</li>
                ))}
            </ul>
            {/* end-Range Slider----------------------------------- */}
        </div>
    );
};

export { Base };
