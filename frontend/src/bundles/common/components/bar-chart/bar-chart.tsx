import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { BarColor, BarLabel } from '../../enums/enums';
import { dateHelper } from '../../helpers/helpers';
import styles from './bar.module.scss';
import { options } from './config-bar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type DataObject = { date: string; value: number };
type ChartProperties = {
    income: DataObject[];
    outcome: DataObject[];
};

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

export { type DataObject, Chart };
