import { actions as authActions } from '~/bundles/auth/store';
import {
    Header,
    RouterOutlet,
} from '~/bundles/common/components/components.js';
import { AppRoute, dataTabs } from '~/bundles/common/enums/enums.js';
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

    return (
        <>
            <Header
                name={user?.email}
                avatar={
                    'https://ideastest.org.uk/wp-content/uploads/2019/04/default-avatar-1.jpg'
                }
                dataTabs={dataTabs}
            />
            <RouterOutlet />
        </>
    );
};

export { App };
