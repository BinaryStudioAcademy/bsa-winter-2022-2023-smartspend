import { type AnyAction, type Dispatch, type Middleware  } from '@reduxjs/toolkit';

import { notification } from '~/services/notification/notification.service';

const handleError: Middleware = () => {
    return (next: Dispatch) => {
        return (action: AnyAction): AnyAction | undefined => {
            if (action.error) {
                const { message } = action.error;

                notification.error(message);

                return;
            }

            return next(action);
        };
    };
};

export { handleError };
