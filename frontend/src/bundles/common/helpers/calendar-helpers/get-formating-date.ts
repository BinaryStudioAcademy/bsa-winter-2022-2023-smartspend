import { type Range } from 'react-date-range';

const formatOneDay = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
};

const formatRange = (range: Range): string => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    const formatedStartDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).format(startDate);
    const formatedEndDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).format(endDate);
    if (formatedStartDate === formatedEndDate) {
        return `${formatedStartDate}`;
    }
    return ` ${formatedStartDate} - ${formatedEndDate} `;
};

const formatRangeGraph = (range: Range): string => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    const startMonth = new Intl.DateTimeFormat('en-US', {
        month: 'short',
    }).format(startDate);
    const endMonth = new Intl.DateTimeFormat('en-US', {
        month: 'short',
    }).format(endDate);
    const startDay = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
    }).format(startDate);
    const endDay = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
    }).format(endDate);

    if (startDate && endDate) {
        const monthDiff =
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear());
        switch (monthDiff) {
            case 0: {
                return `${startMonth} ${startDay} - ${endDay}`;
            }
            case 1: {
                return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
            }
            default: {
                return `${startMonth} - ${endDay}`;
            }
        }
    } else {
        return `${startMonth} ${startDay} - ${endDay}`;
    }
};

export { formatOneDay, formatRange, formatRangeGraph };
