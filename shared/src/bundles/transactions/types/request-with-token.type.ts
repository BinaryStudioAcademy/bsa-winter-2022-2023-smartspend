import {
    type TransactionCreateRequestDto,
    type TransactionFindRequestDto,
} from './types.js';

type TokenRequestTransactionDto = {
    body: TransactionCreateRequestDto;
    params: TransactionFindRequestDto;
    token: string;
};

export { type TokenRequestTransactionDto };
