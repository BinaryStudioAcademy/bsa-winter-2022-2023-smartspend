import { createAsyncThunk } from '@reduxjs/toolkit';
import { type TransactionGetAllResponseDto } from 'shared/build/index.js';

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

const deleteTransaction = createAsyncThunk<
    DeleteTransactionResponseDto,
    string,
    AsyncThunkConfig
>(`${sliceName}/delete-transactions`, async (id, { extra }) => {
    const { transactionsApi } = extra;
    return await transactionsApi.deleteTransaction(id);
});

export { deleteTransaction, loadTransactions };
