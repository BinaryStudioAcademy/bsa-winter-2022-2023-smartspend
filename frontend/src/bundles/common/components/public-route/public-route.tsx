import { Navigate } from 'react-router-dom';

import { storage, StorageKey } from '~/framework/storage/storage';

import { AppRoute } from '../../enums/enums';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const token = storage.getSync(StorageKey.TOKEN);

    if (token) {
        return <Navigate to={AppRoute.DASHBOARD} />;
    }

    return children;
};

export { PublicRoute };
