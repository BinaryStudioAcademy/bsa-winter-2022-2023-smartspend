import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type WalletCreateRequestDto,
    type WalletGetAllItemResponseDto,
} from '~/bundles/wallets/wallets.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    WalletGetAllItemResponseDto[],
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

const remove = createAsyncThunk<Promise<void>, string, AsyncThunkConfig>(
    `${sliceName}/delete`,
    async (id, { extra }) => {
        const { walletsApi } = extra;

        await walletsApi.deleteWallet(id);
    },
);

const update = createAsyncThunk<
    Promise<void>,
    { id: string; payload: WalletCreateRequestDto },
    AsyncThunkConfig
>(`${sliceName}/delete`, async ({ id, payload }, { extra, dispatch }) => {
    const { walletsApi } = extra;

    await walletsApi.updateWallet({ id, payload });

    await dispatch(loadAll());
});

const getOne = createAsyncThunk<
    WalletGetAllItemResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/load-one`, async (id, { extra }) => {
    const { walletsApi } = extra;

    return await walletsApi.getById(id);
});

export { create, getOne, loadAll, remove, update };
