import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type WalletGetAllItemResponseDto } from '~/bundles/wallets/wallets.js';

import { create, getOne, loadAll, remove, update } from './actions';

type State = {
    wallet: WalletGetAllItemResponseDto;
    wallets: WalletGetAllItemResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    wallet: { id: '', name: '', currencyId: '', balance: 0, ownerId: '' },
    wallets: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'wallets',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.wallets = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });

        builder.addCase(getOne.fulfilled, (state, action) => {
            state.wallet = action.payload;
        });

        builder.addMatcher(
            isAnyOf(
                create.fulfilled,
                remove.fulfilled,
                update.fulfilled,
                getOne.fulfilled,
            ),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );

        builder.addMatcher(
            isAnyOf(
                loadAll.pending,
                create.pending,
                remove.pending,
                update.pending,
                getOne.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );

        builder.addMatcher(
            isAnyOf(
                loadAll.rejected,
                create.rejected,
                remove.rejected,
                update.rejected,
                getOne.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
