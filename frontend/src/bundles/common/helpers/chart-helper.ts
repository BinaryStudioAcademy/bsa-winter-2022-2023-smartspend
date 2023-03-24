import { type ChartOptions } from 'chart.js';

import {
    BORDER_WIDTH,
    FONT_SIZE,
    GRID_COLOR,
    PADDING,
    TEXT_COLOR,
} from '~/bundles/common/components/charts/line-chart/constants/constants';
import { type DataObject } from '~/bundles/common/types/chart-data.type';

const convertDate = (date: string | number | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
};

const getLabels = (data: DataObject[]): Date[] => {
    return data.map(({ date }) => new Date(date));
};

const getData = (data: DataObject[]): number[] => {
    return data.map(({ value }) => value);
};

const createLineChartOptions = (
    tooltipDisplay: boolean,
): ChartOptions<'line'> => ({
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: tooltipDisplay,
        },
    },
    layout: {
        padding: PADDING,
    },
    scales: {
        x: {
            grid: {
                color: GRID_COLOR,
                lineWidth: BORDER_WIDTH,
                tickWidth: 0,
            },
            type: 'time',
            time: {
                unit: 'day',
            },
            ticks: {
                font: {
                    size: FONT_SIZE,
                },
                autoSkip: true,
                maxRotation: 25,
                minRotation: 25,
                align: 'inner',
                color: TEXT_COLOR,
                maxTicksLimit: 8,
                callback: function (value): string {
                    return convertDate(value);
                },
            },
        },
        y: {
            grid: {
                color: GRID_COLOR,
                lineWidth: BORDER_WIDTH,
                tickWidth: 0,
            },
            min: -200,
            ticks: {
                color: TEXT_COLOR,
                maxTicksLimit: 6,
                callback: function (value, index, ticks): string {
                    const newValue =
                        index == ticks.length - 1
                            ? ticks[ticks.length - 2].value * 2
                            : +value;
                    const roundedValue = newValue.toFixed(2);
                    return newValue > 0
                        ? `+ ${roundedValue}$`
                        : `${roundedValue}$`;
                },
            },
        },
    },
});

export { convertDate, createLineChartOptions, getData, getLabels };
