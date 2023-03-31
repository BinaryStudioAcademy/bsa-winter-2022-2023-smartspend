import React from 'react';

import { OneDayCalendar } from './components/one-day-calendar';
import { RangeCalendar } from './components/range-calendar';

type Properties = {
    isRangeCalendar: boolean;
};

const Calendar: React.FC<Properties> = ({ isRangeCalendar }: Properties) => {
    const isRangeView: boolean = isRangeCalendar;

    return <>{isRangeView ? <RangeCalendar /> : <OneDayCalendar />}</>;
};

export { Calendar };
