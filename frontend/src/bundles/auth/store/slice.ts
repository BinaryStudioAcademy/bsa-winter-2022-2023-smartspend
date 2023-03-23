import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserLoadResponseDto } from '~/bundles/users/users.js';

import { loadUser, signIn, signUp } from './actions.js';

type State = {
    user: UserLoadResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    user: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });

        builder.addMatcher(
            isAnyOf(signUp.fulfilled, signIn.fulfilled),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );

        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.user = null;
            },
        );

        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.user = null;
        });
    },
});

export { actions, name, reducer };
