import classNames from 'classnames';

import { ButtonVariant } from '../common/enums/button-variant.enum';
import {
    CardVariant,
    DoughnutChartCardSize,
    DoughnutChartCartVariant,
} from '../common/enums/enums';
import {
    useAppForm,
    useButtonTabsState,
    useCallback,
    useState,
} from '../common/hooks/hooks';
import {
    Button,
    ButtonTabs,
    Calendar,
    CardTotal,
    Chart,
    ChartBox,
    DoughnutChartCard,
    Input,
    LineChart,
    RangeSlider,
    WalletButton,
} from './components/components';
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

const Dashboard: React.FC = () => {
    const { control, errors } = useAppForm<FormValues>({
        defaultValues: { name: '', category: '', wallet: '' },
    });

    const tabsDashboard = [
        { title: 'Days', isActive: true, disabled: false },
        { title: 'Week', isActive: false, disabled: false },
        { title: 'Months', isActive: false, disabled: true },
    ];

    const [firstTabs, setFirstTabs] = useButtonTabsState(tabsDashboard);
    const [secondTabs, setSecondTabs] = useButtonTabsState(tabsDashboard);

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
                            <div
                                key={wallet.id}
                                className={styles.walletWrapper}
                            >
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
                                title={'Account Balance'}
                                date={'Dec 01-23'}
                                controls={
                                    <ButtonTabs
                                        cursor="pointer"
                                        tabsData={secondTabs}
                                        onClick={setSecondTabs}
                                    />
                                }
                            >
                                <LineChart
                                    dataArr={lineChartData}
                                    tooltipDisplay={true}
                                />
                            </ChartBox>
                            <ChartBox
                                title={'Changes'}
                                date={'Dec 01-23'}
                                controls={
                                    <ButtonTabs
                                        cursor="pointer"
                                        tabsData={firstTabs}
                                        onClick={setFirstTabs}
                                    />
                                }
                            >
                                <Chart array={barChartData} />
                            </ChartBox>
                            <DoughnutChartCard
                                title={'Period Income'}
                                date={'Dec 01-23'}
                                transaction_num={1}
                                transaction_type={'Food & Drink'}
                                size={DoughnutChartCardSize.AUTO}
                                variant={DoughnutChartCartVariant.PRIMARY}
                                transaction_sum={'+$4,365.00'}
                                categoriesArray={categories}
                                tooltipDisplay={true}
                            />
                            <DoughnutChartCard
                                title={'Period Expenses'}
                                date={'Dec 01-23'}
                                transaction_num={2}
                                transaction_type={'Salary'}
                                size={DoughnutChartCardSize.AUTO}
                                variant={DoughnutChartCartVariant.SECONDARY}
                                transaction_sum={'-$200'}
                                categoriesArray={categories}
                                tooltipDisplay={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Dashboard };
