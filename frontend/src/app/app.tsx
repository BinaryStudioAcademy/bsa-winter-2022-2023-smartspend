import { actions as authActions } from '~/bundles/auth/store';
import { Link, RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store';
import { storage, StorageKey } from '~/framework/storage/storage';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const token = storage.getSync(StorageKey.TOKEN);

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

    return (
        <>
            <ul className="App-navigation-list">
                <li>
                    <Link to={AppRoute.ROOT}>Root</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_IN}>Sign in</Link>
                </li>
                <li>
                    <Link to={AppRoute.SIGN_UP}>Sign up</Link>
                </li>
                <li>
                    <Link to={AppRoute.UI}>Style Guide</Link>
                </li>
                <li>
                    <Link to={AppRoute.WALLET_DETAILS}>
                        Wallet details page
                    </Link>
                </li>
                <li>
                    <Link to={AppRoute.DASHBOARD}>Dashboard</Link>
                </li>
            </ul>
            <p>Current path: {pathname}</p>

            <div>
                <RouterOutlet />
            </div>
        </>
    );
};

export { App };
