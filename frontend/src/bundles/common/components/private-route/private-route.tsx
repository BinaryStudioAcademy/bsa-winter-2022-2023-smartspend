import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute, DataStatus } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { isHaveName, dataStatus } = useAppSelector(({ users }) => ({
        isHaveName: users.isHaveName,
        dataStatus: users.dataStatus,
    }));
    const { pathname } = useLocation();
    const token = storage.getSync(StorageKey.TOKEN);

    if (!token) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    if (
        !isHaveName &&
        pathname !== AppRoute.USER_PROFILE &&
        dataStatus === DataStatus.FULFILLED
    ) {
        return <Navigate to={AppRoute.USER_PROFILE} />;
    }

    return children;
};

export { PrivateRoute };
