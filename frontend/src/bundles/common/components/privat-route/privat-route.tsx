import { Navigate } from 'react-router-dom';

import { storage, StorageKey } from '../../../../framework/storage/storage';
import { actions as authActions } from '../../../auth/store';
import { AppRoute } from '../../enums/enums';
import { useAppDispatch, useAppSelector, useEffect } from '../../hooks/hooks';

const PrivatRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            void dispatch(authActions.loadUser());
        }
    }, [dispatch, user]);
    const token = storage.getSync(StorageKey.TOKEN);
    if (!token) {
        return <Navigate to={AppRoute.SIGN_IN} />;
    }

    return children;
};

export { PrivatRoute };
