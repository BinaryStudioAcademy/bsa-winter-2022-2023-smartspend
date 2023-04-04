import { createSlice } from '@reduxjs/toolkit';
import { type UserUpdateResponseDto } from 'shared/build';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserGetAllItemResponseDto } from '~/bundles/users/users.js';

import { loadAll, updateUser } from './actions.js';

type State = {
    users: UserGetAllItemResponseDto[];
    userProfile: UserUpdateResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    users: [],
    userProfile: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'users',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAll.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.userProfile = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
    },
});

export { actions, name, reducer };
