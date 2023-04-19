import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type TransactionGetAllResponseDto } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import {
    createTransaction,
    deleteTransaction,
    loadTransactions,
    removeTransactions,
    updateTransaction,
} from './actions.js';

type State = {
    transactions: TransactionGetAllResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
    isLoaded: boolean;
};

const initialState: State = {
    transactions: null,
    dataStatus: DataStatus.IDLE,
    isLoaded: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'transactions',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadTransactions.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.isLoaded = false;
        });

        builder.addCase(loadTransactions.fulfilled, (state, action) => {
            state.transactions = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.isLoaded = true;
        });
        builder.addCase(loadTransactions.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.isLoaded = false;
        });

        builder.addMatcher(
            isAnyOf(
                createTransaction.pending,
                deleteTransaction.pending,
                updateTransaction.pending,
                deleteTransaction.pending,
                removeTransactions.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(
                createTransaction.fulfilled,
                deleteTransaction.fulfilled,
                updateTransaction.fulfilled,
                deleteTransaction.fulfilled,
                removeTransactions.fulfilled,
            ),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );

        builder.addMatcher(
            isAnyOf(
                createTransaction.rejected,
                deleteTransaction.rejected,
                updateTransaction.rejected,
                deleteTransaction.rejected,
                removeTransactions.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
