import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    PrivatRoute,
    PublicRoute,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components';
import { Toast } from '~/bundles/common/components/toast/toast';
import { AppRoute } from '~/bundles/common/enums/enums';
import { Base } from '~/bundles/common/pages/base';
import { Dashboard } from '~/bundles/common/pages/dashboard/dashboard';
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
                                element: 'Root',
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
                                    <PrivatRoute>
                                        <Dashboard />
                                    </PrivatRoute>
                                ),
                            },
                        ],
                    },
                    {
                        path: AppRoute.UI,
                        element: <Base />,
                    },
                ]}
            />
        </StoreProvider>
    </StrictMode>,
);
