import { type ChartOptions } from 'chart.js';

import {
    GRID_COLOR,
    TEXT_COLOR,
} from '~/bundles/common/components/charts/line-chart/constants';
import { convertDate } from '~/bundles/common/helpers/chart-data-helper';

const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    layout: {
        padding: 20,
    },
    scales: {
        x: {
            grid: {
                color: GRID_COLOR,
                lineWidth: 2,
                tickWidth: 0,
            },
            type: 'time',
            time: {
                unit: 'day',
            },
            ticks: {
                font: {
                    size: 10,
                },
                maxRotation: 0,
                align: 'inner',
                color: TEXT_COLOR,
                callback: function (value, index, ticks) {
                    if (
                        index === 0 ||
                        index === ticks.length - 1 ||
                        new Date(value).getDate() === 11 ||
                        new Date(value).getDate() === 23
                    ) {
                        return convertDate(value);
                    }
                    return '';
                },
            },
        },
        y: {
            grid: {
                color: GRID_COLOR,
                lineWidth: 2,
                tickWidth: 0,
            },
            min: -200,
            ticks: {
                color: TEXT_COLOR,
                maxTicksLimit: 6,
                callback: function (value, index, ticks) {
                    const newValue =
                        index == ticks.length - 1
                            ? ticks[ticks.length - 2].value * 2
                            : +value;
                    return newValue > 0
                        ? `+ ${newValue.toFixed(2)}$`
                        : `${newValue.toFixed(2)}$`;
                },
            },
        },
    },
};

export { options };
