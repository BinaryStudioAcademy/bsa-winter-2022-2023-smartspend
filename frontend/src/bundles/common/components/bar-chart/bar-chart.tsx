import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { dateHelper } from '../../helpers/helpers';
import { BarColor, BarLabel } from './bar.enum';
import styles from './bar.module.css';
import { type ChartProperties } from './bar.type';
import { options } from './config-bar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const Chart: React.FC<ChartProperties> = ({ income, outcome }) => {
    const data = {
        datasets: [
            {
                label: BarLabel.OUTCOME_LABEL,
                data: dateHelper(outcome),
                backgroundColor: BarColor.OUTCOME_COLOR,
            },
            {
                label: BarLabel.INCOME_LABEL,
                data: dateHelper(income),
                backgroundColor: BarColor.INCOME_COLOR,
            },
        ],
    };

    return <Bar options={options} data={data} className={styles.chart} />;
};

export { Chart };
