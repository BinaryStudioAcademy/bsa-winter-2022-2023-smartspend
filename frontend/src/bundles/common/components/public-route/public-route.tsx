import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../enums/enums';
import { useAppSelector } from '../../hooks/hooks';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { user } = useAppSelector(({ auth }) => ({ user: auth.user }));

    if (user) {
        return <Navigate to={AppRoute.DASHBOARD} />;
    }

    return children;
};

export { PublicRoute };
