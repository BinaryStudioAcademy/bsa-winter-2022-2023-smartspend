import {
    type BarControllerChartOptions,
    type BarControllerDatasetOptions,
    type BarOptions,
    type CoreChartOptions,
    type DatasetChartOptions,
    type ElementChartOptions,
    type PluginChartOptions,
    type ScaleChartOptions,
} from 'chart.js';
import { type _DeepPartialObject } from 'chart.js/dist/types/utils';

type ConfigBar = _DeepPartialObject<
    CoreChartOptions<'bar'> &
        ElementChartOptions<'bar'> &
        PluginChartOptions<'bar'> &
        DatasetChartOptions<'bar'> &
        ScaleChartOptions<'bar'> &
        BarControllerDatasetOptions &
        BarControllerChartOptions &
        BarOptions
>;

export { type ConfigBar };
