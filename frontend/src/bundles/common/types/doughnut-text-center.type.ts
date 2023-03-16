import {
    type BubbleDataPoint,
    type Chart,
    type ChartTypeRegistry,
    type Point,
} from 'chart.js';

interface ItextCenter {
    id: string;
    afterDatasetsDraw: (
        chart: Chart<
            keyof ChartTypeRegistry,
            (number | [number, number] | Point | BubbleDataPoint)[]
        >,
    ) => void;
}

export { type ItextCenter };
