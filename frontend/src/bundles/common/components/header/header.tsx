import classNames from 'classnames';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import defaultAvatar from '~/assets/img/default-avatar.jpg';
import logoSmartSpend from '~/assets/img/logo-smartspend.svg';
import {
    Button,
    HeaderUserButton,
    Menu,
    Tabs,
} from '~/bundles/common/components/components';
import {
    AppRoute,
    ButtonSize,
    ButtonType,
} from '~/bundles/common/enums/enums.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type TabsData } from '~/bundles/common/types/types.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import styles from './styles.module.scss';

type Properties = {
    firstName?: string | undefined;
    lastName?: string;
    avatar?: string;
    dataTabs: {
        dashboard: TabsData[];
        wallets: TabsData[];
    };
};

const budgetsRegex = /^\/budgets\/[\dA-Za-z-]+$/;
const walletDetailsRegex =
    /^\/wallet\/[\da-z-]+\/(transaction\/future|transaction|budgets|wallet-settings)$/;

const Header: React.FC<Properties> = ({
    firstName = '',
    lastName = '',
    avatar = defaultAvatar,
    dataTabs,
}) => {
    const { id } = useParams();
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
            <div className={classNames(styles.headerContainer, 'container')}>
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
                {token ? (
                    <div className={classNames(styles.headerBody, styles.tabs)}>
                        {(pathname === AppRoute.DASHBOARD ||
                            pathname === AppRoute.BUDGETS ||
                            pathname.match(budgetsRegex)) && (
                            <Tabs tabsData={dataTabs.dashboard} />
                        )}
                        {pathname.match(walletDetailsRegex) && (
                            <Tabs
                                tabsData={dataTabs.wallets}
                                prefix={`${AppRoute.WALLET}/${id}`}
                            />
                        )}
                    </div>
                ) : (
                    <div className={styles.headerBody}>
                        <Menu />
                    </div>
                )}
                {token ? (
                    <HeaderUserButton
                        firstName={firstName}
                        lastName={lastName}
                        avatar={avatar}
                    />
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
