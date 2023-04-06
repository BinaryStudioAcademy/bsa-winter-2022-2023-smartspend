import React from 'react';
import { type Range } from 'react-date-range';

import { OneDayCalendar, RangeCalendar } from './components/components.js';

type Properties = {
    isRangeCalendar: boolean;
    initialRange?: Range;
    onRangeChange?: (day: Range) => void;
};

const Calendar: React.FC<Properties> = ({
    isRangeCalendar,
    initialRange,
    onRangeChange,
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
                <OneDayCalendar />
            )}
        </>
    );
};

export { Calendar };
