import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserGetAllItemResponseDto } from '~/bundles/users/users.js';

import { signIn, signUp } from './actions.js';

type State = {
    user: UserGetAllItemResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
    token: string | null;
};

const initialState: State = {
    user: null,
    dataStatus: DataStatus.IDLE,
    token: null
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.user = null;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            const { token } = action.payload;
            state.token = token;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.user = null;
        });

        builder.addCase(signIn.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.user = null;
        });

        builder.addCase(signIn.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            const { token } = action.payload;
            state.token = token;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.token = '';
        });
    },
});

export { actions, name, reducer };
