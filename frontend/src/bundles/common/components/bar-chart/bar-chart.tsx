import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from 'chart.js';
import PropTypes from 'prop-types';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './bar.module.css';
import { INCOME_COLOR, INCOME_LABEL, OUTCOME_COLOR, OUTCOME_LABEL } from './bar-constants';
import { options } from './config-bar';
import { dateHelper } from './datebar-helper';
import { type ChartProperties } from './types-bar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const Chart: React.FC<ChartProperties> = ({ income, outcome }) => {
    const data = {
        datasets: [
            {
                label: OUTCOME_LABEL,
                data: dateHelper(outcome),
                backgroundColor: OUTCOME_COLOR,
            },
            {
                label: INCOME_LABEL,
                data: dateHelper(income),
                backgroundColor: INCOME_COLOR,
            },
        ],
    };

    return <Bar options={options} data={data} className={styles.chart} />;
};

Chart.propTypes = {
    income: PropTypes.array.isRequired,
    outcome: PropTypes.array.isRequired,
};

export { Chart };
