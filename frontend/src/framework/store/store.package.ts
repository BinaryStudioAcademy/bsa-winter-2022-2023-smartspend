import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
    configureStore,
} from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/';
import { budgetsApi } from '~/bundles/budgets/budgets.js';
import { reducer as budgetsReducer } from '~/bundles/budgets/store/';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { categoriesApi } from '~/bundles/common/stores/categories/categories.js';
import { reducer as categoriesReducer } from '~/bundles/common/stores/categories/slice.js';
import { reducer as transactionsReducer } from '~/bundles/common/stores/transactions/';
import { transactionsApi } from '~/bundles/common/stores/transactions/transactions.js';
import { currencyApi } from '~/bundles/currencies/currencies.js';
import { reducer as currenciesReducer } from '~/bundles/currencies/store';
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
    budgets: ReturnType<typeof budgetsReducer>;
    wallets: ReturnType<typeof walletsReducer>;
    categories: ReturnType<typeof categoriesReducer>;
    currencies: ReturnType<typeof currenciesReducer>;
    transactions: ReturnType<typeof transactionsReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    budgetsApi: typeof budgetsApi;
    walletsApi: typeof walletsApi;
    categoriesApi: typeof categoriesApi;
    notification: typeof notification;
    storage: typeof storage;
    currencyApi: typeof currencyApi;
    transactionsApi: typeof transactionsApi;
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
                budgets: budgetsReducer,
                wallets: walletsReducer,
                categories: categoriesReducer,
                currencies: currenciesReducer,
                transactions: transactionsReducer,
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
            budgetsApi,
            walletsApi,
            categoriesApi,
            notification,
            storage,
            currencyApi,
            transactionsApi,
        };
    }
}

export { Store };
