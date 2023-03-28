import { Navigate } from 'react-router-dom';

import { storage, StorageKey } from '~/framework/storage/storage';

import { AppRoute } from '../../enums/enums';
import { useAppSelector } from '../../hooks/hooks';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { user } = useAppSelector(({ auth }) => ({ user: auth.user }));
    const token = storage.getSync(StorageKey.TOKEN);
    if (!user && !token) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }
    return children;
};

export { PrivateRoute };
