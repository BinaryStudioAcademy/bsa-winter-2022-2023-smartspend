import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type BudgetSliceResponseDto } from '../types/types';
import { create, loadAll, remove, update } from './actions';

type State = {
    budgets: BudgetSliceResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    budgets: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'budgets',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.budgets = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });

        builder.addMatcher(
            isAnyOf(create.fulfilled, remove.fulfilled, update.fulfilled),
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
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
