import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type UserProfileResponseDto } from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserGetAllItemResponseDto } from '~/bundles/users/users.js';

import { deleteUser, loadAll, loadUser } from './actions.js';

type State = {
    users: UserGetAllItemResponseDto[];
    user: UserProfileResponseDto | undefined;
    dataStatus: ValueOf<typeof DataStatus>;
    isLoaded: boolean;
};

const initialState: State = {
    users: [],
    user: undefined,
    dataStatus: DataStatus.IDLE,
    isLoaded: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'users',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.isLoaded = true;
        });
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });

        builder.addMatcher(
            isAnyOf(loadAll.pending, loadUser.pending, deleteUser.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
                state.isLoaded = false;
            },
        );
        builder.addMatcher(
            isAnyOf(loadAll.rejected, loadUser.rejected, deleteUser.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
