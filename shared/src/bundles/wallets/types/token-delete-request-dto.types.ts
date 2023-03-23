import { type WalletFindRequestDto } from './types.js';

type TokenDeleteRequestDto = {
    params: WalletFindRequestDto;
    token: string;
};

export { type TokenDeleteRequestDto };
