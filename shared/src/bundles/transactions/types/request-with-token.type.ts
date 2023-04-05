import {
    type TransactionCreateRequestDto,
    type TransactionFindRequestDto,
} from './types';

type TokenRequestTransactionDto = {
    body: TransactionCreateRequestDto;
    params: TransactionFindRequestDto;
    token: string;
};

export { type TokenRequestTransactionDto };
