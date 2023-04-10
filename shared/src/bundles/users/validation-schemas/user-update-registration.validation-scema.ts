import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserUpdateRequestDto } from '../types/types.js';

const emailRegExp = /^[^\s@]+(?:\.[^\s@]+)*@[\w-]+(?:\.[\w-]+)+$/;
const nameRegExp = /^[\dA-Za-z]+(?:-[\dA-Za-z]+)*$/;
const INVALID_EMAIL_ERROR = 'any.invalid';

const currentDate = new Date();
const tomorrowDate = new Date();
tomorrowDate.setDate(currentDate.getDate() + 1);
const minDate = new Date(currentDate.getFullYear() - 50, 0, 1);

type UserUpdate = Omit<UserUpdateRequestDto, 'sex' | 'language' | 'currency'>;

const userUpdateReg = joi.object<UserUpdate, true>({
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
    firstName: joi
        .string()
        .trim()
        .min(2)
        .max(30)
        .pattern(nameRegExp)
        .required()
        .messages({
            'string.base': UserValidationMessage.FIRSTNAME_INVALID,
            'string.empty': UserValidationMessage.FIRSTNAME_REQUIRE,
            'string.min': UserValidationMessage.FIRSTNAME_MIN,
            'string.max': UserValidationMessage.FIRSTNAME_MAX,
            'string.pattern.base': UserValidationMessage.FIRSTNAME_INCORRECT,
            'any.required': UserValidationMessage.FIRSTNAME_REQUIRE,
        }),
    lastName: joi
        .string()
        .trim()
        .min(2)
        .max(30)
        .pattern(nameRegExp)
        .required()
        .messages({
            'string.base': UserValidationMessage.LASTNAME_INVALID,
            'string.empty': UserValidationMessage.LASTNAME_REQUIRE,
            'string.min': UserValidationMessage.LASTNAME_MIN,
            'string.max': UserValidationMessage.LASTNAME_MAX,
            'string.pattern.base': UserValidationMessage.LASTNAME_INCORRECT,
            'any.required': UserValidationMessage.LASTNAME_REQUIRE,
        }),
    dateOfBirth: joi
        .string()
        .required()
        .custom((value, helpers) => {
            if (new Date(value) <= minDate) {
                return helpers.error('any.required');
            }
            if (new Date(value) > tomorrowDate) {
                return helpers.error('any.required');
            }
        })
        .messages({
            'date.format': UserValidationMessage.DATE_FORMAT_WRONG,
            'date.min': UserValidationMessage.DATE_FORMAT_WRONG,
            'any.required': UserValidationMessage.DATE_REQUIRE,
        }),
    // dateOfBirth: joi
    //     .string()
    //     .required()
    //     .custom((value, helpers) => {
    //         const selectedDate = new Date(value);
    //         const tomorrow = new Date();
    //         tomorrow.setDate(tomorrow.getDate() + 1);
    //         const tomorrowDate = new Date(
    //             tomorrow.getFullYear(),
    //             tomorrow.getMonth(),
    //             tomorrow.getDate(),
    //             0,
    //             0,
    //             0,
    //             0,
    //         );
    //         if (selectedDate <= minDate) {
    //             return helpers.error('any.required');
    //         }
    //         if (selectedDate > tomorrowDate) {
    //             return helpers.error('any.required');
    //         }
    //     })
    //     .messages({
    //         'date.format': UserValidationMessage.DATE_FORMAT_WRONG,
    //         'date.min': UserValidationMessage.DATE_FORMAT_WRONG,
    //         'any.required': UserValidationMessage.DATE_REQUIRE,
    //     }),
});

export { userUpdateReg };
