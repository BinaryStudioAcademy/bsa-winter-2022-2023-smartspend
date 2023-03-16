import React from 'react';

import { CardTotal } from '../components/card-total/card-total';
import { CardVariant } from '../enums/card-variant.enum';

const Base: React.FC = () => {
    return (
        <div>
            Base Page
            <div>
                <p style={{ textAlign: 'center' }}>Card Total</p>
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
            </div>
        </div>
    );
};

export { Base };
