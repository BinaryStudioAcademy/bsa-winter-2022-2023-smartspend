import React from 'react';

import { Button } from '../components/components';
import { Tabs } from '../components/tabs/tabs';
import { ButtonSize } from '../enums/button-size.enum';
import { ButtonVariant } from '../enums/button-variant.enum';

const tabsData = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const Base: React.FC = () => {
    return (
        <>
            <Tabs tabsData={tabsData} />
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
        </>
    );
};

export { Base };
