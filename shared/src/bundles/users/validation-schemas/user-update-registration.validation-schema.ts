import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserUpdateRequestDto } from '../types/types.js';

const emailRegExp = /^[^\s@]+(?:\.[^\s@]+)*@[\w-]+(?:\.[\w-]+)+$/;
const nameRegExp = /^[\dA-Za-z]+(?:-[\dA-Za-z]+)*$/;
const INVALID_EMAIL_ERROR = 'any.invalid';

const currentDate = new Date();
const yesterday = new Date();
yesterday.setDate(currentDate.getDate() - 1);
const minDate = new Date(
    currentDate.getFullYear() - 16,
    currentDate.getMonth(),
    currentDate.getDate(),
);

const userUpdateReg = joi.object<UserUpdateRequestDto, true>({
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
            'string.min': UserValidationMessage.NAME_MIN,
            'string.max': UserValidationMessage.NAME_MAX,
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
            'string.min': UserValidationMessage.NAME_MIN,
            'string.max': UserValidationMessage.NAME_MAX,
            'string.pattern.base': UserValidationMessage.LASTNAME_INCORRECT,
            'any.required': UserValidationMessage.LASTNAME_REQUIRE,
        }),
    dateOfBirth: joi
        .string()
        .required()
        .custom((value, helpers) => {
            if (value > minDate && value < yesterday) {
                return helpers.error('string.min');
            }
            if (value >= yesterday) {
                return helpers.error('any.required');
            }
            return value;
        })
        .messages({
            'string.base': UserValidationMessage.DATE_FORMAT_WRONG,
            'string.valid': UserValidationMessage.DATE_FORMAT_WRONG,
            'string.format': UserValidationMessage.DATE_FORMAT_WRONG,
            'string.min': UserValidationMessage.DATE_MINIMUM,
            'any.required': UserValidationMessage.DATE_REQUIRE,
        }),
    createdAt: joi.string(),
    id: joi.string(),
    imageId: joi.string().allow(null),
    updatedAt: joi.string(),
    userId: joi.string(),
    language: joi.string().allow(null),
    currency: joi.string().allow(null),
    sex: joi.string(),
});

export { userUpdateReg };
