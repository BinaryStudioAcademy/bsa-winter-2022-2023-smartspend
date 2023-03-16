import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { type ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { CHART_COLOR } from '~/bundles/common/components/charts/line-chart/constants/constants';

import { type DataObject } from './line.type';
import { options } from './options';
import styles from './styles.module.scss';

type Properties = {
    dataArr: DataObject[];
};

const LineChart: React.FC<Properties> = ({ dataArr }) => {
    const data: ChartData<'line'> = {
        datasets: [
            {
                data: dataArr.map(({ date, value }) => {
                    return { x: new Date(date).getTime(), y: value };
                }),
                borderColor: CHART_COLOR,
                backgroundColor: CHART_COLOR,
            },
        ],
    };

    return <Line options={options} data={data} className={styles.chart} />;
};

export { LineChart };
