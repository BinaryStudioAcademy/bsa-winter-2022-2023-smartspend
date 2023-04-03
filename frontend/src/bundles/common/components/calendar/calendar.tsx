import React from 'react';
import { type Range } from 'react-date-range';

import { OneDayCalendar } from './one-day-calendar';
import { RangeCalendar } from './range-calendar';
import styles from './styles.module.scss';

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
        <div className={styles.calendars_wrapper}>
            {isRangeView ? (
                <RangeCalendar
                    onRangeChange={onRangeChange}
                    initialRange={initialRange}
                />
            ) : (
                <OneDayCalendar />
            )}
        </div>
    );
};

export { Calendar };
