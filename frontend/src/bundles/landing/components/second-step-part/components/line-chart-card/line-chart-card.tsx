import {
    ButtonTabs,
    LineChart,
} from '~/bundles/landing/components/components.js';
import { type DataObject } from '~/bundles/landing/types/types.js';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    date: string;
    dataArr: DataObject[];
};

const LineChartCard: React.FC<Properties> = ({ dataArr, title, date }) => {
    const tabsDashboard = [
        { title: 'Days', isActive: true, disabled: false },
        { title: 'Weeks', isActive: false, disabled: false },
        { title: 'Months', isActive: false, disabled: false },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>{title}</p>
                    <span className={styles.date}>{date}</span>
                </div>
                <ButtonTabs tabsData={tabsDashboard} />
            </div>
            <div className={styles.containerLineChart}>
                <LineChart
                    dataArr={dataArr}
                    tooltipDisplay={false}
                    pointHoverRadius={3}
                />
            </div>
        </div>
    );
};

export { LineChartCard };
