import { useLocation, useNavigate } from 'react-router-dom';

import userLogo from '~/assets/img/user.jpg';

import { AppRoute, ButtonSize, ButtonType } from '../../enums/enums';
import { useCallback } from '../../hooks/hooks';
import { Button, Link, Menu } from '../components';
import { Tabs } from '../tabs/tabs';
import styles from './styles.module.scss';

type Properties = {
    userName: string | null;
};

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budget', to: AppRoute.BUDGETS },
];

const tabsWallet = [
    { title: 'Transaction', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budget', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const Header: React.FC<Properties> = ({ userName }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const loginHandler = useCallback(
        (): void => navigate(AppRoute.SIGN_IN),
        [navigate],
    );

    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <div className={styles.logo__img}>
                    <img src="" alt="logo" />
                </div>
                <span className={styles.logo__text}>SmarpSpend</span>
            </div>
            <div className={styles.header__body}>
                {userName ? (
                    <>
                        {pathname === AppRoute.DASHBOARD && (
                            <Tabs tabsData={tabsDashboard} />
                        )}
                        {pathname === AppRoute.WALLETS && (
                            <Tabs tabsData={tabsWallet} />
                        )}
                    </>
                ) : (
                    <Menu />
                )}
            </div>

            {pathname === AppRoute.ROOT ? (
                <Button
                    type={ButtonType.BUTTON}
                    size={ButtonSize.SMALL}
                    className={styles.header__btn}
                    onClick={loginHandler}
                >
                    Login
                </Button>
            ) : (
                <Link to={AppRoute.USER}>
                    <div className={styles.header__logo}>
                        <div className={styles.user__logo}>
                            <img src={userLogo} alt="user" />
                        </div>
                        <span className={styles.logo__text}>{userName}</span>
                    </div>
                </Link>
            )}
        </header>
    );
};

export { Header };
