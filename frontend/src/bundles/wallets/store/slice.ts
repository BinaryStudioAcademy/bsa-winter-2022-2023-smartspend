import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type WalletGetAllItemResponseDto } from '~/bundles/wallets/wallets.js';

import { loadAll } from './actions';

type State = {
    wallets: WalletGetAllItemResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    wallets: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'wallets',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.wallets = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAll.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
