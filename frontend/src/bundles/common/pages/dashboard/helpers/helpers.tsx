import { type Range } from 'react-date-range';

import { type DataObject } from '~/bundles/common/types/chart-data.type';

import { barChartData, categories, lineChartData } from '../mocks.dashboard';

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
    // if (startDate == undefined) {
    //     return categories.filter(
    //         (date) =>
    //             new Date(date.date) >= new Date('Mar 01,2023') &&
    //             new Date(date.date) <= new Date('Mar 31,2023'),
    //     );
    // }
    // if (endDate == undefined) {
    //     return categories.filter(
    //         (date) =>
    //             new Date(date.date) >= new Date('Mar 01,2023') &&
    //             new Date(date.date) <= new Date('Mar 31,2023'),
    //     );
    // }
    // let waiting = true;
    // while (waiting) {
    //     waiting = startDate === undefined && endDate === undefined;
    // }
    return categories.filter(
        (date) =>
            startDate &&
            new Date(date.date) >= startDate &&
            endDate &&
            new Date(date.date) <= endDate,
    );
};

export { filterCategories, filterChart, filterLineChart };
