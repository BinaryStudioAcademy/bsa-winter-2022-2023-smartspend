import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { type Range } from 'react-date-range';

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
    FaIcons,
} from '~/bundles/common/enums/enums.js';
import {
    formatRangeGraph,
    getInitialRange,
} from '~/bundles/common/helpers/helpers';
import {
    useAppDocumentTitle,
    useAppForm,
} from '~/bundles/common/hooks/hooks.js';
import { type DataType } from '~/bundles/common/types/types';
import { WalletCardSize } from '~/bundles/landing/enums/enums';

// import { getInitialRange } from '../../helpers/helpers';
import {
    filterCategories,
    filterChart,
    filterLineChart,
} from './helpers/helpers';
import {
    type Wallet,
    byCategory,
    byWallets,
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
                    <span className={styles.walletIcon}>
                        <FontAwesomeIcon
                            icon={FaIcons.PLUS}
                            color={'var(--color-white-100)'}
                        />
                    </span>
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

    const [day, setDay] = useState<Range>(getInitialRange());

    const handleSelectDay = useCallback((day: Range): void => {
        setDay(day);
    }, []);

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

                        <WalletButton>Add New Wallet</WalletButton>
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
                                    <Calendar
                                        isRangeCalendar
                                        initialRange={day}
                                        onRangeChange={handleSelectDay}
                                    />
                                </div>
                                <div className={styles.smallCalendar}>
                                    <Calendar isRangeCalendar={false} />
                                </div>
                            </div>
                            <div className={styles.buttonWrapper}>
                                <Button
                                    variant={ButtonVariant.PLAIN}
                                    className={styles.resetButton}
                                >
                                    Reset filters
                                </Button>
                            </div>
                        </div>
                        <div className={styles.filtersContainer}>
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
                                label="By category"
                                labelClassName={styles.dropdownLabel}
                            />
                            <Input
                                labelClassName={styles.filterLabel}
                                control={control}
                                errors={errors}
                                label={'By note'}
                                name={'name'}
                                placeholder={'Filter by specific keyword'}
                            />
                            <div className={styles.filter}>
                                <span className={styles.categoryText}>
                                    By amount
                                </span>
                                <div className={styles.slider}>
                                    <RangeSlider
                                        rangeLimits={rangeLimits}
                                        currentRange={currentRange}
                                        onChange={handleSliderChange}
                                    />
                                </div>
                            </div>
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
                                title="Total Period Income"
                                sum={7600.34}
                                variant={CardVariant.VIOLET}
                            />
                        </div>
                        <div className={styles.charts}>
                            <ChartBox
                                title={'Account Balance'}
                                date={formatRangeGraph(day)}
                            >
                                <LineChart dataArr={filterLineChart(day)} />
                            </ChartBox>
                            <ChartBox
                                title={'Changes'}
                                date={formatRangeGraph(day)}
                            >
                                <Chart array={filterChart(day)} />
                            </ChartBox>
                            <ChartBox
                                title={'Period income'}
                                date={formatRangeGraph(day)}
                            >
                                <DoughnutChart
                                    categories={filterCategories(day)}
                                />
                            </ChartBox>
                            <ChartBox
                                title={'Period Expenses'}
                                date={formatRangeGraph(day)}
                            >
                                <DoughnutChart
                                    categories={filterCategories(day)}
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
