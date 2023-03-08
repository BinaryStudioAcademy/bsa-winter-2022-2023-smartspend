type Constructor = {
    message: string;
    cause?: unknown;
};
declare class ApplicationError extends Error {
    constructor({ message, cause }: Constructor);
}
export { ApplicationError };
