import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { storage, StorageKey } from '~/framework/storage/storage';

import {
    type TransactionCreateRequestDto,
    type TransactionFindRequestDto,
    type TransactionUpdatePayloadDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const createTransaction = createAsyncThunk<
    Promise<void>,
    TransactionCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/transactions`, async (registerPayload, { extra }) => {
    const { transactionApi } = extra;

    await transactionApi.createTransaction(registerPayload);
});

const updateTransaction = createAsyncThunk<
    Promise<void>,
    TransactionUpdatePayloadDto,
    AsyncThunkConfig
>(`${sliceName}/transactions`, async (registerPayload, { extra }) => {
    const { transactionApi } = extra;

    await transactionApi.updateTransaction(registerPayload);
});

const deleteTransaction = createAsyncThunk<
    Promise<void>,
    TransactionFindRequestDto,
    AsyncThunkConfig
>(`${sliceName}/transactions`, async (registerPayload, { extra }) => {
    const { transactionApi } = extra;
    const token = await storage.get(StorageKey.TOKEN);
    token &&
        (await transactionApi.deleteTransaction({
            params: registerPayload,
            token,
        }));
});

export { createTransaction, deleteTransaction, updateTransaction };
