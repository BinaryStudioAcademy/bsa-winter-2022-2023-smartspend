import { type BubbleDataPoint, type ChartData, type Point } from 'chart.js';
import { ArcElement, Chart as ChartJS } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DoughnutData } from '../../enums/doughnut-data.enum.js';
import {
    createGradients,
    getGradientColors,
    sumArray,
} from '../../helpers/helpers.js';
import {
    type ItemType,
    type ItextCenter,
    type ScriptableContext,
} from './doughnut-char.types.js';
import styles from './doughnut-chart.module.scss';

ChartJS.register(ArcElement);

const DoughnutChart: React.FC<{ categories: ItemType[] }> = ({
    categories,
}) => {
    const colors = categories.map((object) => getGradientColors(object.color));

    const data: ChartData<
        'doughnut',
        (number | [number, number] | Point | BubbleDataPoint | null)[]
    > = {
        datasets: [
            {
                data: categories.map((object) => object.total),
                backgroundColor: (context: ScriptableContext<'doughnut'>) =>
                    createGradients(context, colors),
            },
        ],
    };

    const options = {
        cutout: DoughnutData.CUTOUT,
        radius: DoughnutData.RADIUS,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    //test features
    const textCenter: ItextCenter = {
        id: 'textCenter',
        afterDatasetsDraw(chart) {
            const { ctx, data } = chart;

            const sum = sumArray(data.datasets[0].data as number[]);
            const text = ((data.datasets[0].data[1] as number) * 100) / sum;
            const x = chart.getDatasetMeta(0).data[0].x;
            const y = chart.getDatasetMeta(0).data[0].y;

            ctx.save();
            ctx.font = '700 12px sans-serif';
            ctx.fillStyle = '#163676';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${Math.round(text)}%`, x, y);
        },
    };

    return (
        <div className={styles.doughnut}>
            <Doughnut data={data} options={options} plugins={[textCenter]} />
        </div>
    );
};

export { DoughnutChart };