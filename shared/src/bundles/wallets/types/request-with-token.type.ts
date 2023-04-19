import {
    type WalletCreateRequestDto,
    type WalletFindRequestDto,
} from './types.js';

type TokenRequestDto = {
    body: WalletCreateRequestDto;
    params: WalletFindRequestDto;
    token: string;
};

export { type TokenRequestDto };
