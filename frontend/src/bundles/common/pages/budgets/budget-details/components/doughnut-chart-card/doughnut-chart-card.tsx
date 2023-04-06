import classNames from 'classnames';

import BlueMurseIcon from '~/assets/img/blue-murse-icon.svg';
import OrangeMurseIcon from '~/assets/img/orange-murse-icon.svg';
import { DoughnutChart } from '~/bundles/common/components/components';
import { DoughnutChartCartVariant } from '~/bundles/landing/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    title: string;
    date: string;
    transaction_num: number;
    transaction_type: string;
    transaction_sum: string;
    variant?: DoughnutChartCartVariant;
    categories: {
        total: number;
        color: string;
    }[];
};

const DoughnutChartCard: React.FC<Properties> = ({
    title,
    date,
    transaction_num,
    transaction_sum,
    transaction_type,
    variant = DoughnutChartCartVariant.PRIMARY,
    categories,
}) => {
    const transactionSumClass = classNames(
        styles.transactionSum,
        transaction_sum.includes('+') ? styles.blue : styles.red,
    );

    return (
        <div className={styles.container}>
            <div className={styles.topPart}>
                <p className={styles.title}>{title}</p>
                <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.chartPart}>
                <DoughnutChart tooltipDisplay={false} categories={categories} />
            </div>
            <div className={styles.bottomPart}>
                <div className={styles.transactionTypeContainer}>
                    <img
                        src={
                            variant === DoughnutChartCartVariant.PRIMARY
                                ? BlueMurseIcon
                                : OrangeMurseIcon
                        }
                        alt={'murse'}
                    />
                    <p className={styles.transactionType}>{transaction_type}</p>
                </div>
                <p className={styles.transactionNum}>
                    {transaction_num} transaction
                </p>
                <p className={transactionSumClass}>{transaction_sum}</p>
            </div>
        </div>
    );
};

export { DoughnutChartCard };
