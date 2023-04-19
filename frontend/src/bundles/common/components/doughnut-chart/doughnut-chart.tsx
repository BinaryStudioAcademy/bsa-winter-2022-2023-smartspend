import 'chart.js/auto';

import {
    type BubbleDataPoint,
    type ChartData,
    type Point,
    type ScriptableContext,
} from 'chart.js';
import { ArcElement, Chart as ChartJS } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DoughnutData } from '~/bundles/common/enums/enums.js';
import {
    createGradients,
    getGradientColors,
    // sumArray,
} from '~/bundles/common/helpers/helpers.js';

// import { type ItextCenter } from '~/bundles/common/types/types.js';
import styles from './styles.module.scss';

type Properties = {
    categories: {
        total: number;
        color: string;
    }[];
    tooltipDisplay?: boolean;
};

ChartJS.register(ArcElement);

const DoughnutChart: React.FC<Properties> = ({
    categories,
    tooltipDisplay = true,
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
            tooltip: {
                enabled: tooltipDisplay,
            },
        },
        borderWidth: 1,
    };

    //test in center - features
    // const textCenter: ItextCenter = {
    //     id: 'textCenter',
    //     afterDatasetsDraw(chart) {
    //         const { ctx, data } = chart;

    //         let text: number;
    //         if (data.datasets.length > 1) {
    //             const sum = sumArray(data.datasets[0].data as number[]);
    //             text = ((data.datasets[0].data[1] as number) * 100) / sum;
    //         }
    //         text = 100;
    //         const x = chart.getDatasetMeta(0).data[0].x;
    //         const y = chart.getDatasetMeta(0).data[0].y;

    //         ctx.save();
    //         ctx.font = '700 12px sans-serif';
    //         ctx.fillStyle = '#163676';
    //         ctx.textAlign = 'center';
    //         ctx.textBaseline = 'middle';
    //         ctx.fillText(`${Math.round(text)}%`, x, y);
    //     },
    // };

    return (
        <div className={styles.doughnut}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export { DoughnutChart };
