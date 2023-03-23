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

const App: React.FC = () => {
    const { pathname } = useLocation();
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [dispatch, isRoot]);

    useEffect(() => {
        if (!user) {
            void dispatch(authActions.loadUser());
        }
    }, [dispatch, user]);

    return <RouterOutlet />;
};

export { App };
