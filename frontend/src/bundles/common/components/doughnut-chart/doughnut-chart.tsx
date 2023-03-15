import { type BubbleDataPoint, type ChartData, type Point, ArcElement, Chart as ChartJS } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DoughnutData } from '../../enums/doughnut-data.enum.js';
import { createGradients, getGradientColors, sumArray } from '../../helpers/helpers.js';
import { type ItemType, type ItextCenter, type ScriptableContext } from './doughnut-char.types.js';
import styles from './doughnut-chart.module.scss';

ChartJS.register(ArcElement);

const DoughnutChart: React.FC<{ categories: ItemType[] }> = ({ categories }) => {
    const colors = categories.map(object => getGradientColors(object.color));

    const data: any = { // type issues - ChartData<'doughnut', (number | [number, number] | Point | BubbleDataPoint | null)[]>
        datasets: [{
            data: categories.map(object => object.total),
            backgroundColor: (context: ScriptableContext<'doughnut'>) => createGradients(context, colors),
            cutout: DoughnutData.CUTOUT,
            radius: DoughnutData.RADIUS,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const textCenter: ItextCenter = { //test features
        id: 'textCenter',
        afterDatasetsDraw(chart) {
            const { ctx, data } = chart;

            const sum = sumArray(data.datasets[0].data as number[]);
            const text = (data.datasets[0].data[2] as number) * 100 / sum;
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
