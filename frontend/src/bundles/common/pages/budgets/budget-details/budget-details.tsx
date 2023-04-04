// import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Calendar } from '~/bundles/common/components/calendar/calendar';
import {
    Button,
    TransactionTable,
} from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { DoughnutChartCartVariant } from '~/bundles/landing/enums/enums';

import {
    BudgetModal,
    BudgetProgressBar,
    InfoCard,
} from './components/components';
import { DoughnutChartCard } from './components/doughnut-chart-card/doughnut-chart-card';
import { InfoCardTypes } from './enums/enums';
import { calculateBudgetDetails } from './helpers/helpers';
import styles from './styles.module.scss';

const getBudget = {
    id: '1',
    name: 'My first budget',
    amount: 100_000,
    spent: 12_500,
    startDate: 'April 22, 2023',
    recurrence: 'monthly',
    categories: [
        {
            id: '6b6510e3-7bd9-4952-9db4-e97a03dce2f6',
            name: 'Food & Drink',
            icon: 'burger-soda',
            color: 'red',
            type: 'expense',
        },
    ],
    currency: 'USD',
};

const BudgetDetails = (): JSX.Element => {
    const doughnutData = [
        {
            total: 1150,
            color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
        },
        {
            total: 1825,
            color: 'linear-gradient(96.2deg, #FECC66 -30.03%, #F83062 95.13%)',
        },
        {
            total: 1325,
            color: 'linear-gradient(96.2deg, #FE66E6 -30.03%, #6933DD 95.13%)',
        },
    ];
    const transactionData = [
        {
            id: '1',
            category: 'Food',
            name: 'faBagShopping',
            date: '2022-03-23',
            label: 'Supermarket',
            amount: -35,
            currency: '$',
        },
        {
            id: '2',
            category: 'Transport',
            name: 'faCarAlt',
            date: '2022-03-23',
            label: 'Gas Station',
            amount: -50,
            currency: '$',
        },
        {
            id: '3',
            category: 'Shopping',
            name: 'faStoreAltSlash',
            date: '2022-04-22',
            label: 'Clothing Store',
            amount: 120,
            currency: '$',
        },
        {
            id: '4',
            category: 'Food',
            name: 'faBowlFood',
            date: '2022-03-22',
            label: 'Cafeteria',
            amount: -10,
            currency: '$',
        },
        {
            id: '5',
            category: 'Transport',
            name: 'faCarAlt',
            date: '2022-03-22',
            label: 'Taxi Company',
            amount: -25,
            currency: '$',
        },
        {
            id: '6',
            category: 'Salary',
            name: 'faMoneyBill',
            date: '2023-03-30',
            label: 'Electronics Store',
            amount: 3500,
            currency: '$',
        },
        {
            id: '7',
            category: 'Food',
            name: 'faBowlFood',
            date: '2024-03-21',
            label: 'Restaurant',
            amount: -60,
            currency: '$',
        },
        {
            id: '8',
            category: 'Transport',
            name: 'faCarAlt',
            date: '2022-03-21',
            label: 'Public Transport',
            amount: -5,
            currency: '$',
        },
        {
            id: '9',
            category: 'Salary',
            name: 'faMoneyBill',
            date: '2023-04-30',
            label: 'Electronics Store',
            amount: 3500,
            currency: '$',
        },
    ];
    const budget = getBudget;
    const [active, setActive] = useState(false);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);
    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    // const { id } = useLocation();
    const { canSpend, moneyLeft, lastDate } = calculateBudgetDetails(budget);

    return (
        <div className={styles.container}>
            <div className={classNames(styles.contentWrapper, 'container')}>
                <div className={styles.calendarWrapper}>
                    <Calendar isRangeCalendar={true} />
                </div>
                <div className={styles.budgetInfoWrapper}>
                    <div className={styles.breadcrumbsWrapper}>
                        {budget.name}
                    </div>
                    <div className={styles.editButtonWrapper}>
                        <Button
                            className={styles.editButton}
                            variant={ButtonVariant.SECONDARY}
                            onClick={handleModal}
                        >
                            Edit budget
                        </Button>
                        <div className={styles.modal}>
                            <BudgetModal
                                isShown={active}
                                onClose={handleCancel}
                                budget={budget}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.cardsWrapper}>
                    <InfoCard
                        type={InfoCardTypes.ORIGINALLY}
                        total={budget.amount}
                        currency={budget.currency}
                    />

                    <InfoCard
                        type={InfoCardTypes.SPENT}
                        total={budget.spent}
                        currency={budget.currency}
                    />
                    <InfoCard
                        type={InfoCardTypes.LEFT}
                        total={moneyLeft}
                        currency={budget.currency}
                    />
                    <InfoCard
                        type={InfoCardTypes.CAN}
                        total={canSpend}
                        currency={budget.currency}
                    />
                </div>
                <div className={styles.progressWrapper}>
                    <div>Budget progress</div>
                    <div className={styles.progressContent}>
                        <div>
                            You can spending{' '}
                            {canSpend.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}{' '}
                            {budget.currency}/Day
                        </div>
                        <BudgetProgressBar
                            totalBudget={budget.amount}
                            spentSoFar={budget.spent}
                        />
                        <div className={styles.periodBudgetWrapper}>
                            <div>{budget.startDate}</div>
                            <div>{lastDate}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.cartBoxWrapper}>
                    <div className={styles.chartWrapper}>
                        <DoughnutChartCard
                            variant={DoughnutChartCartVariant.SECONDARY}
                            title={'Accounted Categories'}
                            date={budget.startDate}
                            transaction_num={0}
                            transaction_type={'some'}
                            transaction_sum={''}
                            categories={doughnutData}
                        />
                    </div>
                    <div className={styles.chartWrapper}>
                        <DoughnutChartCard
                            title={'Accounted Wallets'}
                            date={budget.startDate}
                            transaction_num={0}
                            transaction_type={''}
                            transaction_sum={''}
                            categories={doughnutData}
                        />
                    </div>
                </div>
                <div className={styles.transactionTable}>
                    <TransactionTable transactions={transactionData} />
                </div>
            </div>
        </div>
    );
};

export { BudgetDetails };
