import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { type ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { CHART_COLOR } from '~/bundles/common/components/charts/line-chart/constants';
import { type ChartProperties } from '~/bundles/common/components/charts/line-chart/line.type';

import styles from './chart.module.css';
import { options } from './options';

const LineChart: React.FC<ChartProperties> = ({ dataArr }) => {
    const data: ChartData<'line'> = {
        datasets: [
            {
                data: dataArr.map(({ date, value }) => {
                    return { x: new Date(date).getTime(), y: value };
                }),
                borderColor: CHART_COLOR,
                backgroundColor: CHART_COLOR,
            }
        ],
    };

    return (
        <Line options={options} data={data} className={styles.chart} />
    );
};

export { LineChart };
