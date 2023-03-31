import { CodeHighlight, LineChart } from '../components';
import styles from './styles.module.scss';

const LINE_CHART_DATA = [
    { date: 'Mar 01,2023', value: 0 },
    { date: 'Mar 04,2023', value: 4500 },
    { date: 'Mar 07,2023', value: 6000 },
    { date: 'Mar 12,2023', value: 7000 },
    { date: 'Mar 14,2023', value: 7000 },
    { date: 'Mar 16,2023', value: 7500 },
    { date: 'Mar 19,2023', value: 5000 },
    { date: 'Mar 27,2023', value: 6500 },
    { date: 'Mar 30,2023', value: 5000 },
];

const codeExample = `
const LINE_CHART_DATA = [
    { date: 'Mar 01,2023', value: 0 },
    { date: 'Mar 04,2023', value: 4500 },
    { date: 'Mar 07,2023', value: 6000 },
    { date: 'Mar 12,2023', value: 7000 },
    { date: 'Mar 14,2023', value: 7000 },
    { date: 'Mar 16,2023', value: 7500 },
    { date: 'Mar 19,2023', value: 5000 },
    { date: 'Mar 27,2023', value: 6500 },
    { date: 'Mar 30,2023', value: 5000 },
];

const LineChartExample: React.FC = () => {
    return (
        <LineChart dataArr={LINE_CHART_DATA} />
    );
};

export { LineChartExample };
`;

const LineChartPart: React.FC = () => {
    return (
        <>
            <CodeHighlight code={codeExample} />
            <div className={styles.lineChartContainer}>
                <div className={styles.lineChart}>
                    <LineChart dataArr={LINE_CHART_DATA} />
                </div>
            </div>
        </>
    );
};

export { LineChartPart };
