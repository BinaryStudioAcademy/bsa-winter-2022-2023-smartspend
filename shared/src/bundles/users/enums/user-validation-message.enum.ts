enum UserValidationMessage {
    EMAIL_REQUIRE = 'Email is required',
    EMAIL_WRONG = 'Invalid e-mail address',
    PASSWORD_REQUIRE = 'Password is required',
    PASSWORD_MIN = 'Minimum length is 8 characters',
    PASSWORD_MAX = 'Maximum length is 30 characters',
    PASSWORD_CONFIRM = 'Passwords do not match',
    FIRSTNAME_REQUIRE = 'First name is required',
    FIRSTNAME_INVALID = 'Invalid first name format',
    FIRSTNAME_MIN = 'Minimum length for first name is 2 characters',
    FIRSTNAME_MAX = 'Maximum length for first name is 30 characters',
    FIRSTNAME_INCORRECT = 'Incorrect character in first name',
    LASTNAME_REQUIRE = 'Last name is required',
    LASTNAME_INVALID = 'Invalid last name format',
    LASTNAME_MIN = 'Minimum length for last name is 2 characters',
    LASTNAME_MAX = 'Maximum length for last name is 30 characters',
    LASTNAME_INCORRECT = 'Incorrect character in last name',
}

export { UserValidationMessage };
