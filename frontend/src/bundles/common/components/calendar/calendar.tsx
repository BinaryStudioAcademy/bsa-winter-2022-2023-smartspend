import React from 'react';

import { OneDayCalendar } from './one-day-calendar';
import { RangeCalendar } from './range-calendar';
import styles from './styles.module.scss';

type Properties = {
    isRangeCalendar: boolean;
};

const Calendar: React.FC<Properties> = ({ isRangeCalendar }: Properties) => {
    const isRangeView: boolean = isRangeCalendar;

    return (
        <div className={styles.calendars_wrapper}>
            {isRangeView ? <RangeCalendar /> : <OneDayCalendar />}
        </div>
    );
};

export { Calendar };
