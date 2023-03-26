import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../enums/enums';
import { useAppSelector } from '../../hooks/hooks';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { user } = useAppSelector(({ auth }) => ({ user: auth.user }));
    if (!user) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return children;
};

export { PrivateRoute };
