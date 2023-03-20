type DataObject = { date: string };

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
} as const;

const dateToShortStringHelper = (
    array: DataObject[],
    options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
): DataObject[] => {
    return array.map((object) => {
        return {
            ...object,
            date: new Date(object.date).toLocaleDateString('en-US', options),
        };
    });
};

export { dateToShortStringHelper };
