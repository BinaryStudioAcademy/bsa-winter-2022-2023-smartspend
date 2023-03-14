import { type Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const handleError: Middleware = () => {
    return (next) => {
        return (action): void => {
            if (action.error) {
                const { message } = action.error;
                toast.error(message);
            }

            return next(action);
        };
    };
};

export { handleError };
