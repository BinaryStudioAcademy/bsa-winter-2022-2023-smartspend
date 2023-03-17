import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { type ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { CHART_COLOR } from '~/bundles/common/components/charts/line-chart/constants/constants';
import { getData, getLabels } from '~/bundles/common/helpers/chart-helper';
import { type DataObject } from '~/bundles/common/types/chart-data.type';

import { options } from './options';
import styles from './styles.module.scss';

type Properties = {
    dataArr: DataObject[];
};

const LineChart: React.FC<Properties> = ({ dataArr }) => {
    const data: ChartData<'line'> = {
        labels: getLabels(dataArr),
        datasets: [
            {
                label: 'line chart',
                data: getData(dataArr),
                borderColor: CHART_COLOR,
                backgroundColor: CHART_COLOR,
            },
        ],
    };

    return <Line options={options} data={data} className={styles.chart} />;
};

export { LineChart };
