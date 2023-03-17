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

export { convertDate, getData, getLabels };
