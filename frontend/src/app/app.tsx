import { library } from '@fortawesome/fontawesome-svg-core';

import { actions as authActions } from '~/bundles/auth/store';
import {
    BaseModal,
    Header,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { dataTabs } from '~/bundles/common/config/header-tabs.config.js';
import { AppRoute, ButtonSize } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { iconProvider } from '~/bundles/common/icon-provider';
import { actions as userActions } from '~/bundles/users/store';
import { storage, StorageKey } from '~/framework/storage/storage';

import styles from '../bundles/auth/components/sign-up-form/styles.module.scss';

library.add(iconProvider);

const App: React.FC = () => {
    const { pathname } = useLocation();
    const token = storage.getSync(StorageKey.TOKEN);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [isShown, setShown] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

    const onModalClose = useCallback(() => {
        localStorage.setItem('showPWA', 'false');
        setShown(false);
    }, []);

    const handleEvent = (event_: Event): void => {
        event_.preventDefault();
        setDeferredPrompt(event_);
        setShown(true);
    };

    const onModalSubmit = useCallback(() => {
        localStorage.setItem('showPWA', 'false');
        setShown(false);
        if (!deferredPrompt) {
            return;
        }
        window.removeEventListener('beforeinstallprompt', handleEvent);
        void (deferredPrompt as BeforeInstallPromptEvent).prompt();
    }, [deferredPrompt]);

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        const showPWA = localStorage.getItem('showPWA');
        if (token && !showPWA) {
            window.addEventListener('beforeinstallprompt', handleEvent);

            return (): void => {
                window.removeEventListener('beforeinstallprompt', handleEvent);
            };
        }
    }, [token]);

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [dispatch, isRoot]);

    useEffect(() => {
        if (!user && token) {
            void dispatch(authActions.loadUser());
        }
    }, [dispatch, token, user]);

    return (
        <>
            <BaseModal
                isShown={isShown}
                Header={<h1 className={styles.modalTitle}>Install the app</h1>}
                Body={
                    <div className={styles.modalDetailsContainer}>
                        <p className={styles.modalDetails}>
                            Do you want to install our app on your device?
                        </p>
                    </div>
                }
                submitButtonName={'Yes'}
                onClose={onModalClose}
                onSubmit={onModalSubmit}
                width={450}
                footerContainerClass={styles.footerContainerClass}
                buttonsSize={ButtonSize.MEDIUM}
            />
            <Header name={user?.email} dataTabs={dataTabs} />
            <RouterOutlet />
        </>
    );
};

export { App };
