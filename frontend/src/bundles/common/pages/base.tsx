import React from 'react';

import { Chart } from '../components/components';

const Base: React.FC = () => {
    return (
        <div>
            <div style={{ width: '500px' }}>
                <h3>Bar Chart</h3>
                <Chart
                    income={[
                        { date: '01 Jan 2022 00:00:00 GMT', value: 200_000 },
                        { date: '03 Jan 2022 00:00:00 GMT', value: 250_000 },
                        { date: '05 Feb 2023 00:00:00 GMT', value: 750_000 },
                    ]}
                    outcome={[
                        { date: '01 Jan 2022 00:00:00 GMT', value: 100_000 },
                        { date: '03 Jan 2022 00:00:00 GMT', value: 150_000 },
                        { date: '01 Feb 2023 00:00:00 GMT', value: 350_000 },
                        { date: '05 Feb 2023 00:00:00 GMT', value: 250_000 },
                    ]}
                />
            </div>
        </div>
    );
};

export { Base };
