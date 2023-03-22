import { Navigate } from 'react-router-dom';

import { actions as authActions } from '../../../auth/store';
import { AppRoute } from '../../enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useAuth,
    useEffect,
} from '../../hooks/hooks';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const auth = useAuth();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            void dispatch(authActions.loadUser());
        }
    }, [dispatch, user]);

    if (!auth) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }
    return children;
};

export { PrivateRoute };
