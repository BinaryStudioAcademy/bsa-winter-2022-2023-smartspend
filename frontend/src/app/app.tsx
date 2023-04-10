import { library } from '@fortawesome/fontawesome-svg-core';

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
import { actions as usersActions } from '~/bundles/users/store';
import { storage, StorageKey } from '~/framework/storage/storage';

library.add(iconProvider);

const App: React.FC = () => {
    const token = storage.getSync(StorageKey.TOKEN);
    const { user } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const Modal = UseAppPwaHook(token);

    useEffect(() => {
        if (!user && token) {
            void dispatch(usersActions.loadUser());
        }
    }, [dispatch, token, user]);

    useEffect(() => {
        if (token) {
            void dispatch(currenciesActions.loadAll());
        }
    }, [dispatch, token]);

    return (
        <>
            <Header
                firstName={user?.firstName ?? user?.email}
                lastName={user?.lastName}
                dataTabs={dataTabs}
            />
            <RouterOutlet />
            {Modal}
        </>
    );
};

export { App };
