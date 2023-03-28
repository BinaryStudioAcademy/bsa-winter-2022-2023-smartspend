import { Link, useLocation, useNavigate } from 'react-router-dom';

import logoSmartSpend from '~/assets/img/logo-smartspend.svg';

import { AppRoute, ButtonSize, ButtonType } from '../../enums/enums';
import { useCallback } from '../../hooks/hooks';
import { useViewportWidth } from '../../hooks/use-viewport-width/use-viewport-width';
import { Button, Menu } from '../components';
import { Tabs } from '../tabs/tabs';
import styles from './styles.module.scss';

type TabsData = {
    title: string;
    to: string;
};

type Properties = {
    name?: string | null;
    avatar?: string;
    dataTabs: {
        dashboard: TabsData[];
        wallets: TabsData[];
    };
};

const Header: React.FC<Properties> = ({ name, avatar, dataTabs }) => {
    const navigate = useNavigate();
    const viewportWidth = useViewportWidth();
    const { pathname } = useLocation();

    const loginHandler = useCallback(
        (): void => navigate(AppRoute.SIGN_IN),
        [navigate],
    );

    if (pathname === AppRoute.SIGN_IN || pathname === AppRoute.SIGN_UP) {
        return null;
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link to={AppRoute.ROOT} className={styles.headerLogo}>
                    <div className={styles.logoImg}>
                        <img
                            className={styles.imgLogo}
                            src={logoSmartSpend}
                            alt="logo"
                        />
                    </div>
                    <span className={styles.logoText}>SmartSpend</span>
                </Link>
                <div className={styles.headerBody}>
                    {name ? (
                        <>
                            {pathname === AppRoute.DASHBOARD && (
                                <Tabs tabsData={dataTabs.dashboard} />
                            )}
                            {pathname === AppRoute.WALLETS && (
                                <Tabs tabsData={dataTabs.wallets} />
                            )}
                        </>
                    ) : (
                        <Menu />
                    )}
                </div>
                {name ? (
                    <Link className={styles.userLink} to={AppRoute.USER}>
                        <div className={styles.headerLogo}>
                            <div className={styles.userLogo}>
                                {avatar && <img src={avatar} alt="user" />}
                            </div>
                            <span className={styles.logoText}>{name}</span>
                        </div>
                    </Link>
                ) : (
                    <Button
                        type={ButtonType.BUTTON}
                        size={ButtonSize.SMALL}
                        className={styles.headerBtn}
                        onClick={loginHandler}
                    >
                        Login
                    </Button>
                )}
            </div>
        </header>
    );
};

export { Header };
