import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { BarColors } from '~/bundles/common/enums/enums.js';
import { dateToShortStringHelper } from '~/bundles/common/helpers/helpers.js';

import styles from './bar.module.scss';
import { options } from './config-bar.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type OneData = { date: string; value: number };
type DataObject = { label: string; data: OneData[] };
type ChartProperties = { array: DataObject[][] };

const sortByDateAscending = (array: DataObject[][]): DataObject[][] => {
    return array.sort(
        (a, b) =>
            new Date(a[0].data[0]?.date).getTime() -
            new Date(b[0].data[0]?.date).getTime(),
    );
};

const Chart: React.FC<ChartProperties> = ({ array }) => {
    const colors = Object.values(BarColors);

    const sortedArray = sortByDateAscending(array);

    const data = {
        datasets: sortedArray.map((object: DataObject[], index) => {
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
