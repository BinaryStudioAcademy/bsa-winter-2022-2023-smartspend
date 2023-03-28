import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import { Calendar } from '../../components/calendar/calendar';
import {
    Button,
    CardTotal,
    Chart,
    DoughnutChart,
    Input,
    LineChart,
    RangeSlider,
} from '../../components/components';
import { ButtonVariant } from '../../enums/button-variant.enum';
import { CardVariant } from '../../enums/enums';
import { useAppForm } from '../../hooks/hooks';
import {
    type Wallet,
    barChartData,
    categories,
    lineChartData,
    mockSliderData,
    wallets,
} from './mocks.dashboard';
import styles from './styles.module.scss';

type FormValues = {
    name: string;
    category: string;
    wallet: string;
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
            <div className={styles.chartBox}>{children}</div>
        </div>
    );
};

interface WalletButtonProperties {
    children: JSX.Element | string;
    isButton?: boolean;
}

const WalletButton: React.FC<WalletButtonProperties> = ({
    children,
    isButton = true,
}) => {
    return (
        <div className={styles.walletButton}>
            {isButton && (
                <Button variant={ButtonVariant.PLAIN}>
                    <div className={styles.walletIcon}>+</div>
                </Button>
            )}
            <div className={styles.walletButtonTitle}>{children}</div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const { control, errors } = useAppForm<FormValues>({
        defaultValues: { name: '', category: '', wallet: '' },
    });
    const rangeLimits = { min: -100, max: 1000 };
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const [, setFilteredData] = useState(mockSliderData);

    const handleSliderChange = useCallback(
        (range: { min: number; max: number }): void => {
            setCurrentRange(range);

            const newFilteredData = mockSliderData.filter(
                (item) => item.amount >= range.min && item.amount <= range.max,
            );
            setFilteredData(newFilteredData);
        },
        [],
    );

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Wallets</h2>
                    <div className={styles.wallets}>
                        {wallets.map((wallet: Wallet) => (
                            <div key={wallet.id}>
                                <WalletButton isButton={false}>
                                    <>Mock {wallet.title}</>
                                </WalletButton>
                            </div>
                        ))}

                        <WalletButton>Add new wallet</WalletButton>
                        <WalletButton>Connect a bank account</WalletButton>
                    </div>
                    <h2 className={classNames(styles.title, styles.overview)}>
                        Overview
                    </h2>
                </div>
            </div>
            <div
                className={classNames(
                    styles.dashboard,
                    styles.filtersDashboard,
                )}
            >
                <div className={styles.contentWrapper}>
                    <div>
                        <div className={styles.filters}>
                            <div>
                                <div className={styles.largeCalendar}>
                                    <Calendar isRangeCalendar={true} />
                                </div>
                                <div className={styles.smallCalendar}>
                                    <Calendar isRangeCalendar={false} />
                                </div>
                            </div>
                            <div>
                                <RangeSlider
                                    rangeLimits={rangeLimits}
                                    currentRange={currentRange}
                                    onChange={handleSliderChange}
                                />
                            </div>
                        </div>
                        <div className={styles.filters}>
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
                            <Button
                                variant={ButtonVariant.PLAIN}
                                className={styles.resetButton}
                            >
                                Reset filters
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames(styles.dashboard, styles.barsDashboard)}>
                <div className={styles.contentWrapper}>
                    <div className={styles.bars}>
                        <div className={styles.wallets}>
                            <CardTotal
                                title="Total Balance"
                                sum={40.45}
                                variant={CardVariant.ORANGE}
                            />
                            <CardTotal
                                title="Total Period Change"
                                sum={504_000.549}
                                variant={CardVariant.BLUE}
                            />
                            <CardTotal
                                title="Total Period Expenses"
                                sum={-9700.34}
                                variant={CardVariant.WHITE}
                            />
                            <CardTotal
                                title="Total Balance"
                                sum={7600.34}
                                variant={CardVariant.VIOLET}
                            />
                        </div>
                        <div className={styles.charts}>
                            <ChartBox
                                title={'Chart 1'}
                                date={'Dec 01-23'}
                                controls={'Controls'}
                            >
                                <LineChart dataArr={lineChartData} />
                            </ChartBox>
                            <ChartBox
                                title={'Chart 2'}
                                date={'Dec 01-23'}
                                controls={'Controls'}
                            >
                                <Chart array={barChartData} />
                            </ChartBox>
                            <ChartBox title={'Chart 3'} date={'Dec 01-23'}>
                                <DoughnutChart categories={categories} />
                            </ChartBox>
                            <ChartBox title={'Chart 4'} date={'Dec 01-23'}>
                                <DoughnutChart categories={categories} />
                            </ChartBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Dashboard };
