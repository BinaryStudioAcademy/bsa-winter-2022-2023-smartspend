import { type DataObject } from '../../types/types';
import { ButtonTabs, LineChart } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    date: string;
    dataArr: DataObject[];
};

const LineChartCard: React.FC<Properties> = ({ dataArr, title, date }) => {
    const tabsDashboard = [
        { title: 'Days', isActive: true, disabled: false },
        { title: 'Week', isActive: false, disabled: false },
        { title: 'Months', isActive: false, disabled: true },
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
