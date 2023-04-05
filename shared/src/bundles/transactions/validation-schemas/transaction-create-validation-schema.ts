import joi from 'joi';

import { type TransactionCreateRequestDto } from '../types/types.js';

const createTransactionValidationSchema = joi.object<
    TransactionCreateRequestDto,
    true
>({
    categoryId: joi.string().uuid().required(),
    date: joi.date().required(),
    note: joi.string().required(),
    label: joi.string().required(),
    amount: joi.number().required(),
    currencyId: joi.string().uuid().required(),
});

export { createTransactionValidationSchema };
