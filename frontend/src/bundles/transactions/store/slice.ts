import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { type TransactionGetAllItemResponseDto } from '../types/types';

type State = {
    transactions: TransactionGetAllItemResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    transactions: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'transactions',
    reducers: {},
    /*    extraReducers(builder) {
        builder.addCase(createTransaction.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(createTransaction.fulfilled, (state, action) => {
            state.transactions = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(createTransaction.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },*/
});

export { actions, name, reducer };
