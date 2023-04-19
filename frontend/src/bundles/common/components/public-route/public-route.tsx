import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { Loader } from '../components';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { isLoaded } = useAppSelector(({ users }) => ({
        isLoaded: users.isLoaded,
    }));
    const token = storage.getSync(StorageKey.TOKEN);

    if (!isLoaded && token) {
        return <Loader />;
    }

    if (token) {
        return <Navigate to={AppRoute.DASHBOARD} />;
    }

    return children;
};

export { PublicRoute };
