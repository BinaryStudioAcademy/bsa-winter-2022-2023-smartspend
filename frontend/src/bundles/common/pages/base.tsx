import React from 'react';

import { Button, CardTotal, DoughnutChart } from '../components/components.js';
import { ButtonSize } from '../enums/button-size.enum.js';
import { ButtonVariant } from '../enums/button-variant.enum.js';

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
import { CardVariant } from '../enums/card-variant.enum';

const Base: React.FC = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <p>Base page</p>
            {/* Buttons */}
            <div
                style={{
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
            </div>{' '}
            {/*------------------------------------ /end Buttons */}
            {/*------------------------------------------- Cards */}
            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Card Total
                </p>
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'space-around',
                    }}
                >
                    <CardTotal
                        title="Total Balance"
                        sum={40.45}
                        variant={CardVariant.ORANGE}
                    />
                    <CardTotal
                        title="Total Period Change"
                        sum={5040.54}
                        variant={CardVariant.BLUE}
                    />
                    <CardTotal
                        title="Total Period Expenses"
                        sum={-9700.34}
                        variant={CardVariant.WHITE}
                    />
                    <CardTotal
                        title="Total Balance"
                        sum={7600.34}
                        variant={CardVariant.VIOLET}
                    />
                </div>
            </div>{' '}
            {/*--------------------------------------- /end Cards */}
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
