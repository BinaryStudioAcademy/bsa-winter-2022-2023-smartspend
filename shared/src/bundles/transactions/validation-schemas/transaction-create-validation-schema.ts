import joi from 'joi';

import { type TransactionCreateRequestDto } from '../types/types.js';

const createTransactionValidationSchema = joi.object<
    TransactionCreateRequestDto,
    true
>({
    categoryId: joi.string().uuid().required(),
    date: joi.date().required(),
    note: joi.string().max(250),
    labelId: joi.string(),
    amount: joi.number().required(),
    currencyId: joi.string().uuid().required(),
    walletsId: joi.string().uuid().required(),
});

export { createTransactionValidationSchema };
