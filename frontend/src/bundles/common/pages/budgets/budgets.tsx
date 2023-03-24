import {
    BudgetCard,
    Button,
    Header,
} from '~/bundles/common/components/components';
import { AppRoute, ButtonVariant } from '~/bundles/common/enums/enums';

import { useCallback } from '../../hooks/hooks';
import styles from './styles.module.scss';

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budget', to: AppRoute.BUDGETS },
];

const tabsData = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const allTabsData = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

const Budgets: React.FC = () => {
    const handleClickCreate = useCallback((): void => {
        // handle create budget
    }, []);
    return (
        <>
            <Header dataTabs={allTabsData} />
            <div className={styles.budgets}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>Budgets</h1>
                        <div className={styles.cards}>
                            <BudgetCard
                                title={'One'}
                                total={12_301.25}
                                moneyLeft={824.56}
                            />
                            <BudgetCard
                                title={'Two'}
                                total={1301}
                                moneyLeft={135.45}
                            />
                            <BudgetCard
                                title={'Three'}
                                total={15_381}
                                moneyLeft={1025.26}
                            />
                            <BudgetCard
                                title={'Four'}
                                total={75_471}
                                moneyLeft={20_456}
                            />
                            <div
                                className={styles.cardCreate}
                                onClickCapture={handleClickCreate}
                            >
                                <div className={styles.cardWrapper}>
                                    <Button variant={ButtonVariant.ROUND}>
                                        +
                                    </Button>
                                    <p className={styles.createText}>
                                        Create a New Budget
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Budgets };
