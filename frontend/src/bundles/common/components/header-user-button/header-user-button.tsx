import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums';
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import styles from './styles.module.scss';

type Properties = {
    firstName?: string | undefined;
    lastName?: string;
    avatar?: string;
};

const HeaderUserButton: React.FC<Properties> = ({
    firstName,
    lastName,
    avatar,
}: Properties) => {
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

    const logoutHandler = useCallback(() => {
        void storage.drop(StorageKey.TOKEN);
    }, []);

    return (
        <div
            className={styles.userLink}
            onClick={toggleMenu}
            onKeyDown={toggleMenu}
            role="presentation"
            ref={menuReference}
        >
            {firstName && lastName && (
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
                    <span
                        className={styles.logoText}
                    >{`${firstName} ${lastName}`}</span>
                </div>
            )}
            <div
                className={classNames(styles.menu, {
                    [styles.active]: openMenu,
                    [styles.inactive]: !openMenu,
                })}
            >
                <div className={styles.list}>
                    <Link to={AppRoute.USER_PROFILE} className={styles.link}>
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
    );
};

export { HeaderUserButton };
