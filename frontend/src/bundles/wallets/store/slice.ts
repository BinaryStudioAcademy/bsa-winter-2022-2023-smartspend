import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type WalletGetAllItemResponseDto } from '~/bundles/wallets/wallets.js';

import { create, loadAll } from './actions';

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
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.wallets = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });

        builder.addCase(create.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });

        builder.addMatcher(
            isAnyOf(loadAll.pending, create.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(loadAll.rejected, create.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
