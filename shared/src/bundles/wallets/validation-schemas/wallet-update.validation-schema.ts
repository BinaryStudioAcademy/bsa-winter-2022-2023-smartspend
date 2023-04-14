import joi from 'joi';

import { type WalletCreateRequestDto } from '../types/types.js';

const updateWallet = joi.object<WalletCreateRequestDto, true>({
    name: joi.string().trim().required(),
    currencyId: joi.string().uuid().required(),
    balance: joi.number().required(),
});

export { updateWallet };
