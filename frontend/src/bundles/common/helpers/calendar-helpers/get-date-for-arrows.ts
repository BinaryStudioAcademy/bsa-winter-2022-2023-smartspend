import { type Range } from 'react-date-range';

const millisecondsInOneDay = 86_400_000;

const isFirstDayOfMonth = (date: Date | undefined): boolean => {
    return date?.getDate() === 1;
};

const isLastDayOfMonth = (date: Date | undefined): boolean => {
    return (
        new Date(
            date?.getFullYear() ?? 0,
            date?.getMonth() ?? 0,
            (date?.getDate() ?? 0) + 1,
        ).getDate() === 1
    );
};

const getFutureDate = (range: Range): Range => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    const dateDifference: number =
        (endDate?.getTime() ?? 0) - (startDate?.getTime() ?? 0);
    const futureDay: Date = new Date(
        startDate?.getFullYear() ?? 0,
        startDate?.getMonth() ?? 0,
        (startDate?.getDate() ?? 0) + 1,
    );

    if (dateDifference < millisecondsInOneDay) {
        return {
            startDate: futureDay,
            endDate: futureDay,
            key: 'selection',
            color: '#03bfd9',
        };
    }

    if (isFirstDayOfMonth(startDate) && isLastDayOfMonth(endDate)) {
        return {
            startDate: new Date(
                startDate?.getFullYear() ?? 0,
                (startDate?.getMonth() ?? 0) + 1,
                1,
            ),
            endDate: new Date(
                endDate?.getFullYear() ?? Number.NaN,
                (endDate?.getMonth() ?? -1) + 2,
                0,
            ),
            key: 'selection',
            color: '#03bfd9',
        };
    }

    return {
        startDate: new Date((startDate?.getTime() ?? 0) + dateDifference),
        endDate: new Date((endDate?.getTime() ?? 0) + dateDifference),
        key: 'selection',
        color: '#03bfd9',
    };
};

const getPastDate = (range: Range): Range => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    const dateDifference: number =
        (endDate?.getTime() ?? 0) - (startDate?.getTime() ?? 0);
    const pastDay = new Date(
        startDate?.getFullYear() ?? 0,
        startDate?.getMonth() ?? 0,
        (startDate?.getDate() ?? 0) - 1,
    );

    if (dateDifference < millisecondsInOneDay) {
        return {
            startDate: pastDay,
            endDate: pastDay,
            key: 'selection',
            color: '#03bfd9',
        };
    }

    if (isFirstDayOfMonth(startDate) && isLastDayOfMonth(endDate)) {
        return {
            startDate: new Date(
                startDate?.getFullYear() ?? 0,
                (startDate?.getMonth() ?? -1) - 1,
                1,
            ),
            endDate: new Date(
                endDate?.getFullYear() ?? Number.NaN,
                endDate?.getMonth() ?? -1,
                0,
            ),
            key: 'selection',
            color: '#03bfd9',
        };
    }

    return {
        startDate: new Date((startDate?.getTime() ?? 0) + dateDifference),
        endDate: new Date((endDate?.getTime() ?? 0) + dateDifference),
        key: 'selection',
        color: '#03bfd9',
    };
};

export { getFutureDate, getPastDate };
