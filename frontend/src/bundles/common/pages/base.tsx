import React from 'react';

import { Button, Chart } from '../components/components';
import { DoughnutChart } from '../components/doughnut-chart/doughnut-chart';
import { ButtonSize } from '../enums/button-size.enum';
import { ButtonVariant } from '../enums/button-variant.enum';

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

const Base: React.FC = () => {
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
                <div style={{ width: '500px' }}>
                    <h3>Bar Chart</h3>
                    <Chart
                        income={[
                            {
                                date: '01 Jan 2022 00:00:00 GMT',
                                value: 200_000,
                            },
                            {
                                date: '03 Jan 2022 00:00:00 GMT',
                                value: 250_000,
                            },
                            {
                                date: '05 Feb 2023 00:00:00 GMT',
                                value: 750_000,
                            },
                        ]}
                        outcome={[
                            {
                                date: '01 Jan 2022 00:00:00 GMT',
                                value: 100_000,
                            },
                            {
                                date: '03 Jan 2022 00:00:00 GMT',
                                value: 150_000,
                            },
                            {
                                date: '01 Feb 2023 00:00:00 GMT',
                                value: 350_000,
                            },
                            {
                                date: '05 Feb 2023 00:00:00 GMT',
                                value: 250_000,
                            },
                        ]}
                    />
                </div>
            </div>
            {/* Doughnut Chart----------------------------------- */}
            <div>
                <p>Doughnut Chart</p>
                <DoughnutChart categories={categories} />
            </div>
            {/* end-Doughnut Chart------------------------------- */}
        </div>
    );
};

export { Base };
