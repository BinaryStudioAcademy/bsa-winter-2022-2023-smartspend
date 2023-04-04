import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type UserUpdateRequestDto,
    type UserUpdateResponseDto,
} from 'shared/build';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserGetAllResponseDto, userApi } from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

const updateUser = createAsyncThunk<
    UserUpdateResponseDto,
    UserUpdateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/users`, async (payload) => {
    return await userApi.updateUser(payload);
});

export { loadAll, updateUser };
