import React, { useState } from 'react';

import { OneDayCalendar } from './one-day-calendar';
import { RangeCalendar } from './range-calendar';
import styles from './styles.module.scss';

type Properties = {
    isRangeCalendar: boolean;
};

const Calendar: React.FC<Properties> = ({ isRangeCalendar }: Properties) => {
    //TO DO: implement here flag, which will be change view of calendar
    const [isRangeView, setRangeView] = useState<boolean>(isRangeCalendar);

    return (
        <div className={styles.calendars_wrapper}>
            {isRangeView ? <RangeCalendar /> : <OneDayCalendar />}
        </div>
    );
};

export { Calendar };
