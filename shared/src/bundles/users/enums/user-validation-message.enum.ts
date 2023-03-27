enum UserValidationMessage {
    EMAIL_REQUIRE = 'Email is required',
    EMAIL_WRONG = 'Invalid e-mail address',
    PASSWORD_REQUIRE = 'Password is required',
    PASSWORD_MIN = 'Minimum length is 8 characters',
    PASSWORD_MAX = 'Maximum length is 30 characters',
    PASSWORD_CONFIRM = 'Passwords do not match',
}

export { UserValidationMessage };
