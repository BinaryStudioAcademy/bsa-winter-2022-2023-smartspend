import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { signIn, signUp, toggleSignUpModalOpen } from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    signUpModalOpen: boolean;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    signUpModalOpen: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(toggleSignUpModalOpen, (state) => {
            state.signUpModalOpen = !state.signUpModalOpen;
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
            },
        );

        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
    },
});

export { actions, name, reducer };
