import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { type ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { LineChartOptions } from '~/bundles/common/enums/enums.js';
import {
    createLineChartOptions,
    getData,
    getLabels,
} from '~/bundles/common/helpers/helpers.js';
import { type DataObject } from '~/bundles/common/types/types.js';

import styles from './styles.module.scss';

type Properties = {
    dataArr: DataObject[];
    tooltipDisplay?: boolean;
    pointHoverRadius?: number;
};

const LineChart: React.FC<Properties> = ({
    dataArr,
    tooltipDisplay = false,
    pointHoverRadius = 4,
}) => {
    const options = createLineChartOptions(tooltipDisplay);
    const data: ChartData<'line'> = {
        labels: getLabels(dataArr),
        datasets: [
            {
                label: 'line chart',
                data: getData(dataArr),
                borderColor: LineChartOptions.CHART_COLOR as string,
                backgroundColor: LineChartOptions.CHART_COLOR as string,
                pointHoverRadius: pointHoverRadius,
            },
        ],
    };

    return <Line options={options} data={data} className={styles.chart} />;
};

export { LineChart };
