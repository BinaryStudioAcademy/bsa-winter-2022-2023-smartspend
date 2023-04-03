import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Button,
    Calendar,
    CardTotal,
    Chart,
    DoughnutChart,
    Input,
    LineChart,
    NewWalletModal,
    RangeSlider,
    WalletCard,
} from '~/bundles/common/components/components.js';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum.js';
import { CardVariant, FaIcons } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
} from '~/bundles/common/hooks/hooks.js';
import { WalletCardSize } from '~/bundles/landing/enums/enums.js';
import { actions as walletsActions } from '~/bundles/wallets/store';

import {
    barChartData,
    categories,
    lineChartData,
    mockSliderData,
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
    onClick?: () => void;
}

const WalletButton: React.FC<WalletButtonProperties> = ({
    children,
    isButton = true,
    onClick,
}) => {
    return (
        <div className={styles.walletButton}>
            {isButton && (
                <Button
                    variant={ButtonVariant.ROUND}
                    className={styles.button}
                    onClick={onClick}
                >
                    <FontAwesomeIcon
                        icon={FaIcons.PLUS}
                        color={'var(--color-white-100)'}
                    />
                </Button>
            )}

            <div className={styles.walletButtonTitle}>{children}</div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [active, setActive] = useState(false);
    const [, setFilteredData] = useState(mockSliderData);
    const rangeLimits = { min: -100, max: 1000 };
    const [currentRange, setCurrentRange] = useState(rangeLimits);

    const dispatch = useAppDispatch();
    const { wallets } = useAppSelector((state) => state.wallets);
    const { control, errors } = useAppForm<FormValues>({
        defaultValues: { name: '', category: '', wallet: '' },
    });

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

    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);

    useEffect(() => {
        void dispatch(walletsActions.loadAll());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Wallets</h2>
                    <div className={styles.wallets}>
                        {wallets.map(({ id, name, balance }) => (
                            <Link
                                to={`/wallet/${id}`}
                                key={id}
                                className={styles.walletWrapper}
                            >
                                <WalletCard
                                    title={name}
                                    size={WalletCardSize.MEDIUM}
                                    balance_value={balance}
                                    wallet_type={'Balance'}
                                />
                            </Link>
                        ))}
                        <WalletButton onClick={handleModal}>
                            Add new wallet
                        </WalletButton>
                        <WalletButton>Connect a bank account</WalletButton>
                        <NewWalletModal
                            isShown={active}
                            onClose={handleCancel}
                            onSubmit={handleModal}
                        />
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
                            <Input
                                labelClassName={styles.filterLabel}
                                control={control}
                                errors={errors}
                                label={'By wallet'}
                                name={'wallet'}
                                placeholder={'Cash wallet'}
                            />
                            <Input
                                labelClassName={styles.filterLabel}
                                control={control}
                                errors={errors}
                                label={'All Categories'}
                                name={'category'}
                                placeholder={'Filter by specific name'}
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
                                sum={504_000.54}
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
