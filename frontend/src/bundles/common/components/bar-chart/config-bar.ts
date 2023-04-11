import { numberToStringCurrencyHelper } from '../../helpers/helpers';
import { type ConfigBar } from '../../types/types';

const options: ConfigBar = {
    scales: {
        y: {
            grid: {
                color: '#EFF3FF',
                drawTicks: false,
            },
            ticks: {
                callback: (value) => numberToStringCurrencyHelper(value),
                stepSize: 6000,
                color: '#9AACBD',
                padding: 5,
                font: {
                    size: 12,
                    family: 'Rubik, arial',
                    weight: '400',
                },
            },
        },
        x: {
            grid: {
                color: '#EFF3FF',
            },
            ticks: {
                stepSize: 1,
                autoSkipPadding: 10,
                color: '#9AACBD',
                font: {
                    size: 10,
                    family: 'Rubik, arial',
                    weight: '400',
                },
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    responsive: true,
    parsing: {
        xAxisKey: 'date',
        yAxisKey: 'value',
    },
    layout: {
        padding: 20,
    },
    borderWidth: 1,
    barThickness: 5,
};

export { options };
