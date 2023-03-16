import React from 'react';

import { CardTotal } from '../components/card-total/card-total';
import { Button } from '../components/components';
import { ButtonSize } from '../enums/button-size.enum';
import { ButtonVariant } from '../enums/button-variant.enum';
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
            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                {' '}
                {/* Cards */}
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
            {/*---------------------------- /end Cards */}
        </div>
    );
};

export { Base };
