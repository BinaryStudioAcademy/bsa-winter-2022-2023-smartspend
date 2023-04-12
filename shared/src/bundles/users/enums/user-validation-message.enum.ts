enum UserValidationMessage {
    EMAIL_REQUIRE = 'Email is required',
    EMAIL_WRONG = 'Invalid e-mail address',
    PASSWORD_REQUIRE = 'Password is required',
    PASSWORD_MIN = 'Minimum length is 8 characters',
    PASSWORD_MAX = 'Maximum length is 30 characters',
    PASSWORD_CONFIRM = 'Passwords do not match',
    FIRSTNAME_REQUIRE = 'First name is required',
    FIRSTNAME_INVALID = 'Invalid first name format',
    NAME_MIN = 'Min length is 2 characters',
    NAME_MAX = 'Max length is 30 characters',
    FIRSTNAME_INCORRECT = 'Incorrect character in first name',
    LASTNAME_REQUIRE = 'Last name is required',
    LASTNAME_INVALID = 'Invalid last name format',
    LASTNAME_INCORRECT = 'Incorrect character in last name',
    DATE_FORMAT_WRONG = 'Invalid Date',
    DATE_REQUIRE = 'Invalid Date of birth',
    DATE_MINIMUM = 'You must be at least 16 years old',
}

export { UserValidationMessage };
