import { type Range } from 'react-date-range';

import { type DataObject } from '~/bundles/common/types/chart-data.type';

import { barChartData, categories, lineChartData } from '../mocks.dashboard';

const DEFAULT_FILTER_CATEGORIES = [
    {
        date: '',
        total: 100,
        color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
    },
];

type OneData = { date: string; value: number };
type DataRangeObject = { label: string; data: OneData[] };
type DataTotalObjects = { date: string; total: number; color: string }[];

const filterLineChart = (range: Range): DataObject[] => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    return lineChartData.filter(
        (date) =>
            startDate &&
            new Date(date.date) >= startDate &&
            endDate &&
            new Date(date.date) <= endDate,
    );
};

const filterChart = (range: Range): DataRangeObject[][] => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    return barChartData.map(({ label, data }) => {
        const filteredData = data.filter(
            (item: { date: string | number | Date }) => {
                const itemDate = new Date(item.date);
                return (
                    (!startDate || itemDate >= startDate) &&
                    (!endDate || itemDate <= endDate)
                );
            },
        );
        return [{ label, data: filteredData }];
    });
};

const filterCategories = (range: Range): DataTotalObjects => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    const result = categories.filter(
        (date) =>
            startDate &&
            new Date(date.date) >= startDate &&
            endDate &&
            new Date(date.date) <= endDate,
    );
    if (result.length === 0) {
        return DEFAULT_FILTER_CATEGORIES;
    }
    return result;
};

export { filterCategories, filterChart, filterLineChart };
