// import { useLocation } from 'react-router-dom';
import { Calendar } from '~/bundles/common/components/calendar/calendar';
import { Button } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { DoughnutChartCartVariant } from '~/bundles/landing/enums/enums';

import {
    BudgetProgressBar,
    EditBudgetModal,
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
            value: 'John Doe',
            name: 'John Doe',
            image: 'https://placekitten.com/50/50',
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
            <div className={styles.contentWrapper}>
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
                        <EditBudgetModal
                            isShown={active}
                            onClose={handleCancel}
                            budget={budget}
                        />
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
            </div>
        </div>
    );
};

export { BudgetDetails };
