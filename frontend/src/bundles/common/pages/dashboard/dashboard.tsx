import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import {
    Button,
    Calendar,
    CardTotal,
    Chart,
    DoughnutChart,
    Dropdown,
    Input,
    LineChart,
    RangeSlider,
    WalletCard,
} from '~/bundles/common/components/components.js';
import {
    AppDocumentTitles,
    ButtonVariant,
    CardVariant,
} from '~/bundles/common/enums/enums.js';
import {
    useAppDocumentTitle,
    useAppForm,
} from '~/bundles/common/hooks/hooks.js';
import { type DataType } from '~/bundles/common/types/types';
import { WalletCardSize } from '~/bundles/landing/enums/enums';

import {
    type Wallet,
    barChartData,
    byCategory,
    byWallets,
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
    useAppDocumentTitle(AppDocumentTitles.DASHBOARD);
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

    const [wallet, setWallet] = useState<DataType>(byWallets[0]);

    const handleDropdownByWallets = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setWallet(selectedOption);
            }
        },
        [],
    );

    const [category, setCategory] = useState<DataType>(byCategory[0]);

    const handleDropdownByCategory = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setCategory(selectedOption);
            }
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
                            <div
                                key={wallet.id}
                                className={styles.walletWrapper}
                            >
                                <WalletButton isButton={false}>
                                    <WalletCard
                                        title={wallet.title}
                                        size={WalletCardSize.MEDIUM}
                                        balance_value={wallet.value}
                                        wallet_type={'Balance'}
                                    />
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
                    <div className={styles.filtertBody}>
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
                            <Dropdown
                                data={byWallets}
                                handleChange={handleDropdownByWallets}
                                selectedOption={wallet}
                                label="By wallet"
                                labelClassName={styles.dropdownLabel}
                            />
                            <Dropdown
                                data={byCategory}
                                handleChange={handleDropdownByCategory}
                                selectedOption={category}
                                label="By Categories"
                                labelClassName={styles.dropdownLabel}
                            />
                            <Input
                                labelClassName={styles.filterLabel}
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
                        <div className={styles.cards}>
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
