import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { BarColors } from '../../enums/enums';
import { dateToShortStringHelper } from '../../helpers/helpers';
import styles from './bar.module.scss';
import { options } from './config-bar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type OneData = { date: string; value: number };
type DataObject = { data: OneData[]; label: string };
type ChartProperties = { array: DataObject[][] };

const Chart: React.FC<ChartProperties> = ({ array }) => {
    const colors = Object.values(BarColors);

    const data = {
        datasets: array.map((object: DataObject[], index) => {
            return {
                label: object[0].label,
                data: dateToShortStringHelper(object[0].data),
                backgroundColor: colors[index],
            };
        }),
    };

    return <Bar options={options} data={data} className={styles.chart} />;
};

export { type DataObject, Chart };