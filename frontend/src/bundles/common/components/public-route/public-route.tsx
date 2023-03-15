import { Navigate } from 'react-router-dom';

import { actions as userActions } from '~/bundles/users/store';

import { AppRoute } from '../../enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from '../../hooks/hooks';

const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(({ users }) => ({
        users: users.users,
    }));
    const { user } = useAppSelector(({ auth }) => ({
        user: auth.user,
    }));
    const isAuth = users.some((user_) => user_.id === user?.id);

    useEffect(() => {
        void dispatch(userActions.loadAll());
    }, [dispatch, user]);

    if (isAuth) {
        return <Navigate to={AppRoute.DASHBOARD} />;
    }

    return children;
};

export { PublicRoute };
