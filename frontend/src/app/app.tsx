import { library } from '@fortawesome/fontawesome-svg-core';

import { RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store';

import { iconProvider } from '../bundles/common/icon-provider';

library.add(iconProvider);

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [isRoot, dispatch]);

    return <RouterOutlet />;
};

export { App };
