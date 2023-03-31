import { CodeHighlight, DoughnutChart } from '../components';

const categories = [
    {
        total: 1150,
        color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
    },
    {
        total: 1825,
        color: 'linear-gradient(96.2deg, #FECC66 -30.03%, #F83062 95.13%)',
    },
    {
        total: 1325,
        color: 'linear-gradient(96.2deg, #FE66E6 -30.03%, #6933DD 95.13%)',
    },
];

const highlightCodeExample = `
const categories = [
    {
        total: 1150,
        color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
    },
    {
        total: 1825,
        color: 'linear-gradient(96.2deg, #FECC66 -30.03%, #F83062 95.13%)',
    },
    {
        total: 1325,
        color: 'linear-gradient(96.2deg, #FE66E6 -30.03%, #6933DD 95.13%)',
    }
];

const DoughnutExample: React.FC = () => {
    return (
        <DoughnutChart categories={categories} />
    );
}

export { DoughnutExample };
`;

const DoughnutChartPart: React.FC = () => {
    return (
        <div>
            <CodeHighlight code={highlightCodeExample} />
            <DoughnutChart categories={categories} />
        </div>
    );
};

export { DoughnutChartPart };
