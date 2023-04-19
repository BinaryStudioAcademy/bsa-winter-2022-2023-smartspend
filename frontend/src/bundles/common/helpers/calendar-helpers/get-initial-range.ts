import { addDays } from 'date-fns';
import { type Range } from 'react-date-range';

const getInitialRange = (): Range => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
    );

    return {
        startDate: firstDayOfMonth,
        endDate: addDays(lastDayOfMonth, 0),
        key: 'selection',
        color: '#03bfd9',
    };
};

export { getInitialRange };
