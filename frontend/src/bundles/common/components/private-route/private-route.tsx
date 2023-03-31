import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { storage, StorageKey } from '~/framework/storage/storage.js';

import { Loader } from '../components';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { isLoaded } = useAppSelector(({ auth }) => ({
        isLoaded: auth.isLoaded,
    }));
    const token = storage.getSync(StorageKey.TOKEN);

    if (!isLoaded && token) {
        return <Loader />;
    }

    if (!token) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }
    return children;
};

export { PrivateRoute };
