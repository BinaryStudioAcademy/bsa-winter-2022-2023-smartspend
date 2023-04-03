import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const emailRegExp =
    /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z]+(?:[\w-]+\.)+[A-Za-z]{2,}$/;

const userSignUp = joi.object<UserSignUpRequestDto, true>({
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
    password: joi.string().trim().min(8).max(30).required().messages({
        'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
        'string.min': UserValidationMessage.PASSWORD_MIN,
        'string.max': UserValidationMessage.PASSWORD_MAX,
    }),
    repeatPassword: joi
        .string()
        .valid(joi.ref('password'))
        .required()
        .messages({
            'any.only': UserValidationMessage.PASSWORD_CONFIRM,
            'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
        }),
});

export { userSignUp };
