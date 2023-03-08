import { type HttpCode } from '../../../libs/packages/http/http.js';
import { type ValueOf } from '../../../libs/types/value-of.type.js';
import { ApplicationError } from '../application-error/application-error.exception.js';
type Constructor = {
    message: string;
    status: ValueOf<typeof HttpCode>;
    cause?: unknown;
};
declare class HttpError extends ApplicationError {
    status: ValueOf<typeof HttpCode>;
    constructor({ message, cause, status }: Constructor);
}
export { HttpError };
