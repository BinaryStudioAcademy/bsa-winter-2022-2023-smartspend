import React from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '../../enums/enums';
import { useAppSelector } from '../../hooks/hooks';

const PrivatRoute: React.FC<{ component: React.FC }> = ({
    component: Component,
}) => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    return isLoggedIn ? (
        <Component />
    ) : (
        <Navigate to={AppRoute.DASHBOARD} replace />
    );
};

export { PrivatRoute };
