import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as usersReducer } from '~/bundles/users/store/';
import { userApi } from '~/bundles/users/users.js';
import { reducer as walletsReducer } from '~/bundles/wallets/store/';
import { walletsApi } from '~/bundles/wallets/wallets.js';
import { type IConfig } from '~/framework/config/config.js';
import { storage } from '~/framework/storage/storage.js';
import { handleError } from '~/framework/store/middlewares/middlewares.js';
import { notification } from '~/services/services.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
    wallets: ReturnType<typeof walletsReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    walletsApi: typeof walletsApi;
    notification: typeof notification;
    storage: typeof storage;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            AnyAction,
            MiddlewareArray<
                [ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]
            >
        >
    >;

    public constructor(config: IConfig) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: {
                auth: authReducer,
                users: usersReducer,
                wallets: walletsReducer,
            },
            middleware: (getDefaultMiddleware) => {
                return [
                    handleError,
                    ...getDefaultMiddleware({
                        thunk: {
                            extraArgument: this.extraArguments,
                        },
                    }),
                ];
            },
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            walletsApi,
            notification,
            storage,
        };
    }
}

export { Store };
