import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type WalletCreateRequestDto,
    type WalletGetAllResponseDto,
} from '~/bundles/wallets/wallets.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    WalletGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
    const { walletsApi } = extra;

    return await walletsApi.getAll();
});

const create = createAsyncThunk<
    Promise<void>,
    WalletCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create`, async (walletPayload, { extra, dispatch }) => {
    const { walletsApi } = extra;
    await walletsApi.createWallet(walletPayload);

    await dispatch(loadAll());
});

export { create, loadAll };
