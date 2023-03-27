import { library } from '@fortawesome/fontawesome-svg-core';

import { actions as authActions } from '~/bundles/auth/store';
import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store';
import { storage, StorageKey } from '~/framework/storage/storage';

import { iconProvider } from '../bundles/common/icon-provider';

library.add(iconProvider);

const App: React.FC = () => {
    const { pathname } = useLocation();
    const token = storage.getSync(StorageKey.TOKEN);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const isRoot = pathname === AppRoute.ROOT;

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

    return <RouterOutlet />;
};

export { App };
