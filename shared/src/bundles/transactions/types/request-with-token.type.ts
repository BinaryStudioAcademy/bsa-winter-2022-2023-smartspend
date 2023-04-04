import {
    type TransactionCreateRequestDto,
    type TransactionFindRequestDto,
} from './types';

type TokenRequestDto = {
    body: TransactionCreateRequestDto;
    params: TransactionFindRequestDto;
    token: string;
};

export { type TokenRequestDto };
