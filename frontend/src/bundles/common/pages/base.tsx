import React from 'react';

import { Button, Chart } from '../components/components';
import { ButtonSize } from '../enums/button-size.enum';
import { ButtonVariant } from '../enums/button-variant.enum';

const Base: React.FC = () => {
    return (
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
        </div>
    );
};

export { Base };
