import { type Range } from 'react-date-range';

const getForwardMonths = (date: Range): Range => {
    const startDate: Date | undefined = date.startDate;
    const endDate: Date | undefined = date.endDate;
    return {
        startDate: new Date(
            startDate?.getFullYear() ?? Number.NaN,
            (startDate?.getMonth() ?? -1) + 1,
            1,
        ),
        endDate: new Date(
            endDate?.getFullYear() ?? Number.NaN,
            (endDate?.getMonth() ?? -1) + 2,
            0,
        ),
        key: 'selection',
    };
};

const getBackwardMonths = (date: Range): Range => {
    const startDate: Date | undefined = date.startDate;
    const endDate: Date | undefined = date.endDate;
    return {
        startDate: new Date(
            startDate?.getFullYear() ?? Number.NaN,
            (startDate?.getMonth() ?? -1) - 1,
            1,
        ),
        endDate: new Date(
            endDate?.getFullYear() ?? Number.NaN,
            endDate?.getMonth() ?? -1,
            0,
        ),
        key: 'selection',
    };
};

export { getBackwardMonths, getForwardMonths };
