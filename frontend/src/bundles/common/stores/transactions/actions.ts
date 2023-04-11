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
>(
    `${sliceName}/create-transactions`,
    async (registerPayload, { extra, dispatch }) => {
        const { transactionsApi } = extra;

        await transactionsApi.createTransaction(registerPayload);
        await dispatch(loadTransactions());
    },
);

const updateTransaction = createAsyncThunk<
    Promise<void>,
    { id: string; payload: TransactionUpdatePayloadDto },
    AsyncThunkConfig
>(
    `${sliceName}/update-transactions`,
    async ({ id, payload }, { extra, dispatch }) => {
        const { transactionsApi } = extra;

        await transactionsApi.updateTransaction({ id, payload });
        await dispatch(loadTransactions());
    },
);

const deleteTransaction = createAsyncThunk<
    DeleteTransactionResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/delete-transactions`, async (id, { extra, dispatch }) => {
    const { transactionsApi } = extra;

    const result = await transactionsApi.deleteTransaction(id);

    await dispatch(loadTransactions());

    return result;
});

export {
    createTransaction,
    deleteTransaction,
    loadTransactions,
    updateTransaction,
};
