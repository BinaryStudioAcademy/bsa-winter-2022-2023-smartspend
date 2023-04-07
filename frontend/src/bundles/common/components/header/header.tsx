import classNames from 'classnames';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import defaultAvatar from '~/assets/img/default-avatar.jpg';
import logoSmartSpend from '~/assets/img/logo-smartspend.svg';
import {
    AppRoute,
    ButtonSize,
    ButtonType,
} from '~/bundles/common/enums/enums.js';
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { type TabsData } from '../../types/types.js';
import { Button, Menu, Tabs } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    name?: string | null;
    avatar?: string;
    dataTabs: {
        dashboard: TabsData[];
        wallets: TabsData[];
    };
};

const budgetsRegex = /^\/budgets\/\d+$/;
const walletDetailsRegex =
    /^\/wallet\/[\da-z-]+\/(transaction|budget|wallet-settings)$/;

const Header: React.FC<Properties> = ({
    name,
    avatar = defaultAvatar,
    dataTabs,
}) => {
    const [openMenu, setOpenMenu] = useState(false);

    const menuReference = useRef<HTMLDivElement>(null);

    const toggleMenu = useCallback(() => {
        setOpenMenu((previous) => !previous);
    }, []);

    useEffect(() => {
        const handleClick = (event: MouseEvent): void => {
            if (
                menuReference.current &&
                !menuReference.current.contains(event.target as Node)
            ) {
                setOpenMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [menuReference]);

    const { id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const token = storage.getSync(StorageKey.TOKEN);

    const loginHandler = useCallback(
        (): void => navigate(AppRoute.SIGN_IN),
        [navigate],
    );

    const logoutHandler = useCallback(() => {
        localStorage.removeItem(StorageKey.TOKEN);
    }, []);

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
                    <div
                        className={styles.userLink}
                        onClick={toggleMenu}
                        onKeyDown={toggleMenu}
                        role="presentation"
                        ref={menuReference}
                    >
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
                        <div
                            className={classNames(styles.menu, {
                                [styles.active]: openMenu,
                                [styles.inactive]: !openMenu,
                            })}
                        >
                            <div className={styles.list}>
                                <Link
                                    to={AppRoute.USER}
                                    className={styles.link}
                                >
                                    Settings
                                </Link>
                                <Link
                                    onClick={logoutHandler}
                                    to={AppRoute.SIGN_IN}
                                    className={styles.link}
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
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
