import { Chart, CodeHighlight } from '../components';
import styles from './styles.module.scss';

const CHART_DATA = [
    [
        {
            label: 'income',
            data: [
                {
                    date: '01 Jan 2022 00:00:00 GMT',
                    value: 200_000,
                },
                {
                    date: '03 Jan 2022 00:00:00 GMT',
                    value: 250_000,
                },
                {
                    date: '03 Feb 2023 00:00:00 GMT',
                    value: 750_000,
                },
            ],
        },
    ],
    [
        {
            label: 'outcome',
            data: [
                {
                    date: '01 Jan 2022 00:00:00 GMT',
                    value: 100_000,
                },
                {
                    date: '03 Jan 2022 00:00:00 GMT',
                    value: 150_000,
                },
                {
                    date: '01 Feb 2023 00:00:00 GMT',
                    value: 350_000,
                },
                {
                    date: '05 Feb 2023 00:00:00 GMT',
                    value: 250_000,
                },
            ],
        },
    ],
    [
        {
            label: 'test',
            data: [
                {
                    date: '02 Jan 2022 00:00:00 GMT',
                    value: 200_000,
                },
                {
                    date: '03 Jan 2023 00:00:00 GMT',
                    value: 250_000,
                },
                {
                    date: '05 Feb 2023 00:00:00 GMT',
                    value: 750_000,
                },
            ],
        },
    ],
];

const codeExample = `
const CHART_DATA = [
    [
        {
            label: 'income',
            data: [
                {
                    date: '01 Jan 2022 00:00:00 GMT',
                    value: 200_000,
                },
                {
                    date: '03 Jan 2022 00:00:00 GMT',
                    value: 250_000,
                },
                {
                    date: '03 Feb 2023 00:00:00 GMT',
                    value: 750_000,
                },
            ],
        },
    ],
    [
        {
            label: 'outcome',
            data: [
                {
                    date: '01 Jan 2022 00:00:00 GMT',
                    value: 100_000,
                },
                {
                    date: '03 Jan 2022 00:00:00 GMT',
                    value: 150_000,
                },
                {
                    date: '01 Feb 2023 00:00:00 GMT',
                    value: 350_000,
                },
                {
                    date: '05 Feb 2023 00:00:00 GMT',
                    value: 250_000,
                },
            ],
        },
    ],
    [
        {
            label: 'test',
            data: [
                {
                    date: '02 Jan 2022 00:00:00 GMT',
                    value: 200_000,
                },
                {
                    date: '03 Jan 2023 00:00:00 GMT',
                    value: 250_000,
                },
                {
                    date: '05 Feb 2023 00:00:00 GMT',
                    value: 750_000,
                },
            ],
        },
    ],
];

const ChartExample: React.FC = () => {
    return (
        <Chart array={CHART_DATA} />
    );
}

export { ChartExample };
`;

const ChartPart: React.FC = () => {
    return (
        <>
            <CodeHighlight code={codeExample} />
            <div className={styles.barChartContainer}>
                <div className={styles.barChart}>
                    <Chart array={CHART_DATA} />
                </div>
            </div>
        </>
    );
};

export { ChartPart };
