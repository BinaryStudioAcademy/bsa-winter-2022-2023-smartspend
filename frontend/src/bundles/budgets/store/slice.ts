import { createSlice } from '@reduxjs/toolkit';

import { type BudgetResponseDto } from '~/bundles/budgets/budgets.js';
import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { loadAll } from './actions';

type State = {
    budgets: BudgetResponseDto[];
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
            state.budgets = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
    },
});

export { actions, name, reducer };
