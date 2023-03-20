import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

// import { type UserSignInResponseDto } from '~/bundles/users/users.js';
import { signIn } from './actions';

interface UserState {
    token: string | null;
    dataStatus: ValueOf<typeof DataStatus>;
}

const initialState: UserState = {
    token: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signIn.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.token = action.payload.token;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
