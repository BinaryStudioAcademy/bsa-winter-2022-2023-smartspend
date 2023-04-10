import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type UserProfileResponseDto,
    type UserUpdateRequestDto,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type UserGetAllResponseDto } from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

type uploadPayload = {
    email: string;
    userProfile: Partial<UserUpdateRequestDto>;
};

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

const loadUser = createAsyncThunk<
    UserProfileResponseDto | undefined,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/authenticated-user`, async (_registerPayload, { extra }) => {
    const { userApi } = extra;

    return await userApi.loadUser();
});

const updateUser = createAsyncThunk<
    Promise<void>,
    uploadPayload,
    AsyncThunkConfig
>(`${sliceName}/update`, async (payload, { extra, dispatch }) => {
    const { userApi } = extra;

    await userApi.updateUser(payload);

    await dispatch(loadUser());
});

const deleteUser = createAsyncThunk<
    Response & { json<T = unknown>(): Promise<T> },
    string,
    AsyncThunkConfig
>(`${sliceName}/delete`, (token, { extra }) => {
    const { userApi } = extra;

    return userApi.delete(token);
});

export { deleteUser, loadAll, loadUser, updateUser };
