import { Calendar, CodeHighlight } from '../components';

const createCalendarCodeExample = (isRange: boolean): string => {
    return `
    const RangeCalendarExample React.FC = () => {
        return (
            <Calendar isRangeCalendar={${isRange}} />
        );
    };

    export { RangeCalendarExample };
    `;
};

const isRangeCalendarCodeExample = createCalendarCodeExample(true);

const noRangeCalendarCodeExample = createCalendarCodeExample(false);

const CalendarPart: React.FC = () => {
    return (
        <>
            <CodeHighlight code={isRangeCalendarCodeExample} />
            <Calendar isRangeCalendar={true} />
            <CodeHighlight code={noRangeCalendarCodeExample} />
            <Calendar isRangeCalendar={false} />
        </>
    );
};

export { CalendarPart };
