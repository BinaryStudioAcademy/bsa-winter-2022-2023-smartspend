import { type Middleware } from '@reduxjs/toolkit';

import { notification } from '~/services/notification/notification.service';

const handleError: Middleware = () => {
    return (next) => {
        return (action): void => {
            if (action.error) {
                const { message } = action.error;
                notification.error(message);
            }
            return next(action);
        };
    };
};

export { handleError };
