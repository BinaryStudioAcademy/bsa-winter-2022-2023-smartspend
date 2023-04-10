import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type TransactionCreateRequestDto,
    type TransactionGetAllResponseDto,
    type TransactionUpdatePayloadDto,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';
import { type DeleteTransactionResponseDto } from './transactions-api.js';

const loadTransactions = createAsyncThunk<
    TransactionGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-transactions`, async (_, { extra }) => {
    const { transactionsApi } = extra;

    return await transactionsApi.loadTransactions();
});

const createTransaction = createAsyncThunk<
    Promise<void>,
    TransactionCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-transactions`, async (registerPayload, { extra }) => {
    const { transactionsApi } = extra;

    await transactionsApi.createTransaction(registerPayload);
    await transactionsApi.loadTransactions();
});

const updateTransaction = createAsyncThunk<
    Promise<void>,
    TransactionUpdatePayloadDto,
    AsyncThunkConfig
>(`${sliceName}/update-transactions`, async (registerPayload, { extra }) => {
    const { transactionsApi } = extra;

    await transactionsApi.updateTransaction(registerPayload);
    await transactionsApi.loadTransactions();
});

const deleteTransaction = createAsyncThunk<
    DeleteTransactionResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/delete-transactions`, async (id, { extra }) => {
    const { transactionsApi } = extra;
    return await transactionsApi.deleteTransaction(id);
});

export {
    createTransaction,
    deleteTransaction,
    loadTransactions,
    updateTransaction,
};
