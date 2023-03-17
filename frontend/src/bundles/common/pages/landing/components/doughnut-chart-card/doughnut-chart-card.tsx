import { DoughnutChart } from '~/bundles/common/components/doughnut-chart/doughnut-chart';

import styles from './styles.module.scss';

type Properties = {
    categories: {
        total: number;
        color: string;
    }[];
    title: string;
    date: string;
    transaction: number;
    type: string;
};

const DoughnutChartCard: React.FC<Properties> = ({
    categories,
    title,
    date,
    transaction,
    type,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.top_part}>
                <p className={styles.title}>{title}</p>
                <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.chart_part}>
                <DoughnutChart categories={categories} />
            </div>
            <div className={styles.bottom_part}>
                <p>{type}</p>
                <p>{transaction} transaction</p>
                <p>+$4,365.00</p>
            </div>
        </div>
    );
};

export { DoughnutChartCard };
