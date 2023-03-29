import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    PrivateRoute,
    PublicRoute,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components';
import { Toast } from '~/bundles/common/components/toast/toast';
import { AppRoute } from '~/bundles/common/enums/enums';
import { Base } from '~/bundles/common/pages/base';
import { Budgets } from '~/bundles/common/pages/budgets/budgets';
import { Dashboard } from '~/bundles/common/pages/dashboard/dashboard';
import { NotFound } from '~/bundles/common/pages/not-found/not-found';
import { WalletDetails } from '~/bundles/common/pages/wallet-details/wallet-details';
import { Landing } from '~/bundles/landing/landing';
import { store } from '~/framework/store/store';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <Toast />
        <StoreProvider store={store.instance}>
            <RouterProvider
                routes={[
                    {
                        path: AppRoute.ROOT,
                        element: <App />,
                        children: [
                            {
                                path: AppRoute.ROOT,
                                element: (
                                    <PublicRoute>
                                        <Landing />
                                    </PublicRoute>
                                ),
                            },
                            {
                                path: AppRoute.SIGN_IN,
                                element: (
                                    <PublicRoute>
                                        <Auth />
                                    </PublicRoute>
                                ),
                            },
                            {
                                path: AppRoute.SIGN_UP,
                                element: (
                                    <PublicRoute>
                                        <Auth />
                                    </PublicRoute>
                                ),
                            },
                            {
                                path: AppRoute.DASHBOARD,
                                element: (
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.BUDGETS,
                                element: (
                                    <PrivateRoute>
                                        <Budgets />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: AppRoute.WALLET_DETAILS,
                                element: (
                                    <PrivateRoute>
                                        <WalletDetails />
                                    </PrivateRoute>
                                ),
                            },
                        ],
                    },
                    {
                        path: AppRoute.UI,
                        element: <Base />,
                    },
                    {
                        path: AppRoute.NOT_FOUND,
                        element: <NotFound />,
                    },
                ]}
            />
        </StoreProvider>
    </StrictMode>,
);
