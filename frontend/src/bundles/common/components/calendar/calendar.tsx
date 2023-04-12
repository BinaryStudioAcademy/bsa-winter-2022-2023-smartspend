import React from 'react';
import { type Range } from 'react-date-range';

import { type Transaction } from '~/bundles/common/types/transaction.type';

import { OneDayCalendar, RangeCalendar } from './components/components.js';

type Properties = {
    isRangeCalendar: boolean;
    initialRange?: Range;
    onRangeChange?: (day: Range) => void;
    onChange?: React.Dispatch<React.SetStateAction<Transaction>>;
};

const Calendar: React.FC<Properties> = ({
    isRangeCalendar,
    initialRange,
    onRangeChange,
    onChange,
}: Properties) => {
    const isRangeView: boolean = isRangeCalendar;

    return (
        <>
            {isRangeView ? (
                <RangeCalendar
                    onRangeChange={onRangeChange}
                    initialRange={initialRange}
                />
            ) : (
                <OneDayCalendar onChange={onChange} />
            )}
        </>
    );
};

export { Calendar };
