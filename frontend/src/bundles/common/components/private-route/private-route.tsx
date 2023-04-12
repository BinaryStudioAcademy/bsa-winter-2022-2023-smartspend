import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector, useEffect } from '~/bundles/common/hooks/hooks';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { pathname } = useLocation();
    const user = useAppSelector((state) => state.users.user);
    const token = storage.getSync(StorageKey.TOKEN);
    const haveName = storage.getSync(StorageKey.HAVE_NAME);

    useEffect(() => {
        if (user && user.firstName?.length > 0) {
            void storage.set(StorageKey.HAVE_NAME, 'true');
        }
    }, [user, user?.firstName]);

    if (!token) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    if (!haveName && pathname !== AppRoute.USER_PROFILE) {
        return <Navigate to={AppRoute.USER_PROFILE} />;
    }

    return children;
};

export { PrivateRoute };
