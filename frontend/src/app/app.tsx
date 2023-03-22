import { Link, RouterOutlet } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useEffect,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { actions as userActions } from '~/bundles/users/store';

const App: React.FC = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const isRoot = pathname === AppRoute.ROOT;

    useEffect(() => {
        if (isRoot) {
            void dispatch(userActions.loadAll());
        }
    }, [isRoot, dispatch]);

    return (
        <>
            <div>
                <RouterOutlet />
            </div>
        </>
    );
};

export { App };
