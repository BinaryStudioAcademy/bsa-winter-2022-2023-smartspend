import {
    type AnyAction,
    type Dispatch,
    type Middleware,
    isRejected,
} from '@reduxjs/toolkit';

import { actions as authActions } from '~/bundles/auth/store';
import { ExceptionMessage } from '~/bundles/common/enums/enums';
import { notification } from '~/services/services.js';

const handleError: Middleware = () => {
    return (next: Dispatch) => {
        return (action: AnyAction): AnyAction => {
            const result = next(action);

            if (isRejected(result) && !result.meta.rejectedWithValue) {
                if (
                    result.error.message ===
                    ExceptionMessage.EMAIL_ALREADY_EXISTS
                ) {
                    return next(authActions.toggleSignUpModalOpen());
                }
                const error =
                    result.error.message ??
                    'Something went wrong. Please try again later.';
                notification.error(error);
            }

            return result;
        };
    };
};

export { handleError };
