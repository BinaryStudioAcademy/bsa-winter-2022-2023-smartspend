enum ExceptionMessage {
    INVALID_CREDENTIALS = 'You entered an incorrect e-mail address or password',
    EMAIL_ALREADY_EXISTS = 'User with this email already exists',
    INVALID_TOKEN = 'Invalid token',
    JWT_MUST_BE_PROVIDED = 'jwt token must be provided',
}

export { ExceptionMessage };
