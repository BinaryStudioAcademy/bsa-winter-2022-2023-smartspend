import styles from './styles.module.scss';

type Properties = {
    children: JSX.Element | JSX.Element[];
    title: string;
    date: string;
    controls?: JSX.Element | JSX.Element[];
};

const ChartBox: React.FC<Properties> = ({
    children,
    title,
    date,
    controls,
}) => {
    return (
        <div className={styles.chart}>
            <div className={styles.totals}>
                <div>
                    <h3 className={styles.chartTitle}>{title}</h3>
                    <span className={styles.chartDate}>{date}</span>
                </div>
                <div>{controls}</div>
            </div>
            <div className={styles.chartBox}>{children}</div>
        </div>
    );
};

export { ChartBox };
