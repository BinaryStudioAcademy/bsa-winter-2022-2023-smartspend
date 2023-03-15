import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth';
import {
    App,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components';
import { Toast } from '~/bundles/common/components/toast/toast';
import { AppRoute } from '~/bundles/common/enums/enums';
import { Base } from '~/bundles/common/pages/base';
import { store } from '~/framework/store/store';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
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
                                element: <Auth />,
                            },
                            {
                                path: AppRoute.SIGN_UP,
                                element: <Auth />,
                            },
                        ],
                    },
                    {
                        path: AppRoute.UI,
                        element: <Base />,
                    },
                ]}
            />
            <Toast />
        </StoreProvider>
    </StrictMode>,
);
