import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    AppRoute,
    ButtonSize,
    ButtonType,
} from '~/bundles/common/enums/enums.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { Button, Menu, Tabs } from '../components.js';
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
    const { pathname } = useLocation();
    const token = storage.getSync(StorageKey.TOKEN);

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
                <div className={styles.headerLogo}>
                    <div className={styles.logoImg}>
                        <img className={styles.imgLogo} src="" alt="logo" />
                    </div>
                    <span className={styles.logoText}>SmartSpend</span>
                </div>
                <div className={styles.headerBody}>
                    {token ? (
                        <>
                            {(pathname === AppRoute.DASHBOARD ||
                                pathname === AppRoute.BUDGETS) && (
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
                {token ? (
                    <Link className={styles.userLink} to={AppRoute.USER}>
                        <div className={styles.headerLogo}>
                            <div className={styles.userLogo}>
                                {avatar && (
                                    <img
                                        className={styles.imgLogo}
                                        src={avatar}
                                        alt="user"
                                    />
                                )}
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
