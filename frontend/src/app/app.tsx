import { library } from '@fortawesome/fontawesome-svg-core';

import { actions as authActions } from '~/bundles/auth/store';
import {
    Header,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { dataTabs } from '~/bundles/common/config/header-tabs.config.js';
import {
    useAppDispatch,
    UseAppPwaHook,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { iconProvider } from '~/bundles/common/icon-provider';
import { actions as currenciesActions } from '~/bundles/currencies/store';
import { storage, StorageKey } from '~/framework/storage/storage';

library.add(iconProvider);

const App: React.FC = () => {
    const token = storage.getSync(StorageKey.TOKEN);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const Modal = UseAppPwaHook(token);

    useEffect(() => {
        if (!user && token) {
            void dispatch(authActions.loadUser());
        }
    }, [dispatch, token, user]);

    useEffect(() => {
        if (token) {
            void dispatch(currenciesActions.loadAll());
        }
    }, [dispatch, token]);

    return (
        <>
            <Header name={user?.email} dataTabs={dataTabs} />
            <RouterOutlet />
            {Modal}
        </>
    );
};

export { App };
