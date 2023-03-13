import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../enums/enums';
import { useAppSelector } from '../../hooks/hooks';

const PublicRoute: React.FC<{ component: React.FC }> = ({
    component: Component,
}) => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    return isLoggedIn ? <Navigate to={AppRoute.ROOT} replace /> : <Component />;
};

export { PublicRoute };
