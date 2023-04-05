import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserUpdateRequestDto } from '../types/types.js';

const emailRegExp =
    /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z]+(?:[\w-]+\.)+[A-Za-z]{2,}$/;
const nameRegExp = /^[\dA-Za-z]+(?:-[\dA-Za-z]+)*$/;

type UserUpdate = Omit<UserUpdateRequestDto, 'sex' | 'language' | 'currency'>;

const userUpdateReg = joi.object<UserUpdate, true>({
    email: joi
        .string()
        .pattern(emailRegExp)
        .email({
            tlds: {
                allow: false,
            },
        })
        .required()
        .messages({
            'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
            'string.email': UserValidationMessage.EMAIL_WRONG,
            'string.empty': UserValidationMessage.EMAIL_REQUIRE,
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
    dateOfBirth: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': UserValidationMessage.PASSWORD_CONFIRM,
        'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    }),
});

export { userUpdateReg };
