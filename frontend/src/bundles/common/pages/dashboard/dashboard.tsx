import classNames from 'classnames';
import React from 'react';

import { Button, Input } from '../../components/components';
import { DoughnutChart } from '../../components/doughnut-chart/doughnut-chart';
import { ButtonVariant } from '../../enums/button-variant.enum';
import { useAppForm } from '../../hooks/hooks';
import styles from './styles.module.scss';

const wallets: any = [
    { id: '1', title: 'wallet 1' },
    { id: '2', title: 'wallet 2' },
];

type FormValues = {
    name: string;
    category: string;
    wallet: string;
};

// mock
const Total = ({ title, cash, type }: any): any => {
    return (
        <div className={classNames(styles.total, styles[type])}>
            <h4>{title}</h4>
            <p>
                +{cash.toLocaleString('en-US', { minimumFractionDigits: 2 })}$
            </p>
        </div>
    );
};
type ChartBoxProperties = {
    children: JSX.Element | JSX.Element[] | string;
    title: string;
    date: string;
    controls?: JSX.Element | JSX.Element[] | string;
};

const ChartBox = ({
    children,
    title,
    date,
    controls,
}: ChartBoxProperties): JSX.Element => {
    return (
        <div className={classNames(styles.chart)}>
            <div className={styles.totals}>
                <div>
                    <h3 className={styles.chartTitle}>{title}</h3>
                    <span className={styles.chartDate}>{date}</span>
                </div>
                <div>{controls}</div>
            </div>
            <div
                style={{
                    height: '170px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const { control, errors } = useAppForm<FormValues>({
        defaultValues: { name: '', category: '', wallet: '' },
    });

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Wallets</h2>
                    <div className={styles.wallets}>
                        {/* Wallets */}
                        {wallets.map((wallet: any) => (
                            <div key={wallet.id} className={styles.wallet}>
                                {wallet.title}
                            </div>
                        ))}
                    </div>
                    <h2 className={styles.title}>Overview</h2>
                </div>
            </div>
            <div
                className={classNames(
                    styles.dashboard,
                    styles.filtersDashboard,
                )}
            >
                <div className={styles.contentWrapper}>
                    <form>
                        <div className={styles.filters}>
                            <div>calendar</div>
                            <div>range</div>
                        </div>
                        <div className={styles.filters}>
                            {/* Mock inputs */}
                            <Input
                                control={control}
                                errors={errors}
                                label={'By wallet'}
                                name={'wallet'}
                                placeholder={'Cash wallet'}
                            />
                            <Input
                                control={control}
                                errors={errors}
                                label={'All Categories'}
                                name={'category'}
                                placeholder={'Filter by specific name'}
                            />
                            <Input
                                control={control}
                                errors={errors}
                                label={'By note'}
                                name={'name'}
                                placeholder={'Filter by specific name'}
                            />
                            <Button variant={ButtonVariant.PLAIN}>
                                Reset filters
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={classNames(styles.dashboard, styles.barsDashboard)}>
                <div className={styles.contentWrapper}>
                    <div className={styles.bars}>
                        <div className={styles.totals}>
                            <Total
                                title={'Total Balance'}
                                cash={3000}
                                type={'totalBalance'}
                            />
                            <Total
                                title={'Total Period Change'}
                                cash={3000}
                                type={'totalChange'}
                            />
                            <Total
                                title={'Total Period Expenses'}
                                cash={3000}
                                type={'totalExpenses'}
                            />
                            <Total
                                title={'Total Balance'}
                                cash={3000}
                                type={'totalFinal'}
                            />
                        </div>
                        <div className={styles.charts}>
                            <ChartBox
                                title={'Chart 1'}
                                date={'Dec 01-23'}
                                controls={'Controls'}
                            >
                                Chart Bar
                            </ChartBox>
                            <ChartBox
                                title={'Chart 2'}
                                date={'Dec 01-23'}
                                controls={'Controls'}
                            >
                                Chart Bar
                            </ChartBox>
                            <ChartBox title={'Chart 3'} date={'Dec 01-23'}>
                                <DoughnutChart
                                    categories={[
                                        {
                                            total: 1150,
                                            color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
                                        },
                                        {
                                            total: 9225,
                                            color: 'linear-gradient(95.77deg, #00D7BD -14.06%, #03BFD9 101.51%)',
                                        },
                                    ]}
                                />
                            </ChartBox>
                            <ChartBox title={'Chart 4'} date={'Dec 01-23'}>
                                <DoughnutChart
                                    categories={[
                                        {
                                            total: 1150,
                                            color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
                                        },
                                        {
                                            total: 2225,
                                            color: 'linear-gradient(95.77deg, #00D7BD -14.06%, #03BFD9 101.51%)',
                                        },
                                    ]}
                                />
                            </ChartBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Dashboard };
