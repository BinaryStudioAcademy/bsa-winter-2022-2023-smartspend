class ApplicationError extends Error {
    constructor({ message, cause }) {
        super(message, {
            cause,
        });
    }
}
export { ApplicationError };
