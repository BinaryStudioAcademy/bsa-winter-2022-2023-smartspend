import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserGetAllResponseDto } from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

const deleteUser = createAsyncThunk<
    Response & { json<T = unknown>(): Promise<T> },
    string,
    AsyncThunkConfig
>(`${sliceName}/delete`, (token, { extra }) => {
    const { userApi } = extra;

    return userApi.delete(token);
});

export { deleteUser, loadAll };
