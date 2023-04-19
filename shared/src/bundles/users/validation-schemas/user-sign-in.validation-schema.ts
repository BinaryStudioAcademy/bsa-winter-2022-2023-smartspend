import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';

const emailRegExp = /^[^\s@]+(?:\.[^\s@]+)*@[\w-]+(?:\.[\w-]+)+$/;
const INVALID_EMAIL_ERROR = 'any.invalid';

const userSignIn = joi.object<UserSignInRequestDto, true>({
    email: joi
        .string()
        .pattern(emailRegExp)
        .required()
        .messages({
            'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
        })
        .custom((value, helpers) => {
            const [localPart, domainPart] = value.split('@');

            if (localPart.length === 0) {
                return helpers.error(INVALID_EMAIL_ERROR);
            }

            if (localPart.length > 15) {
                return helpers.error(INVALID_EMAIL_ERROR);
            }

            if (
                localPart.startsWith('.') ||
                localPart.endsWith('.') ||
                /\.+/g.test(localPart)
            ) {
                return helpers.error(INVALID_EMAIL_ERROR);
            }

            if (domainPart.length < 3 || domainPart.length > 15) {
                return helpers.error(INVALID_EMAIL_ERROR);
            }

            if (!domainPart.includes('.')) {
                return helpers.error(INVALID_EMAIL_ERROR);
            }

            if (
                domainPart.startsWith('.') ||
                domainPart.endsWith('.') ||
                /(\.-)|(-\.)/g.test(domainPart)
            ) {
                return helpers.error(INVALID_EMAIL_ERROR);
            }

            if (value.split('@').length !== 2) {
                return helpers.error(INVALID_EMAIL_ERROR);
            }

            return value;
        })
        .messages({
            'any.invalid': UserValidationMessage.EMAIL_WRONG,
        }),
    password: joi.string().trim().min(8).max(30).required().messages({
        'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
        'string.min': UserValidationMessage.PASSWORD_MIN,
        'string.max': UserValidationMessage.PASSWORD_MAX,
    }),
});

export { userSignIn };
