import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { isHaveName } = useAppSelector(({ users }) => ({
        isHaveName: users.isHaveName,
    }));
    const { pathname } = useLocation();
    const token = storage.getSync(StorageKey.TOKEN);

    if (!token) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    if (!isHaveName && pathname !== AppRoute.USER) {
        return <Navigate to={AppRoute.USER} />;
    }

    return children;
};

export { PrivateRoute };
