import {
    type BubbleDataPoint,
    type Chart,
    type ChartTypeRegistry,
    type Point,
} from 'chart.js';

interface ItextCenter {
    id: string;
    afterDatasetsDraw: (chart: Chart<
        keyof ChartTypeRegistry,
        (number | [number, number] | Point | BubbleDataPoint)[]
    >) => void;
}

type ItemType = { // example type
    total: number;
    color: string;
};

export { type ItemType, type ItextCenter, };
export { type ScriptableContext } from 'chart.js';
