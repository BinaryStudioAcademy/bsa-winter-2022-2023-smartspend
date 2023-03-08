import { ApplicationError } from '../application-error/application-error.exception.js';
class HttpError extends ApplicationError {
    status;
    constructor({ message, cause, status }) {
        super({
            message,
            cause,
        });
        this.status = status;
    }
}
export { HttpError };
