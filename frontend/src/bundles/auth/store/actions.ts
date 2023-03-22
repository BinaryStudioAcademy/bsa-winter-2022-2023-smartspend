import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserLoadResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    Promise<UserSignUpResponseDto>,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signUp(registerPayload);

    void storage.set(StorageKey.TOKEN, token);

    await dispatch(loadUser());
    return { token };
});

const signIn = createAsyncThunk<
    Promise<UserSignInResponseDto>,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signIn(registerPayload);

    void storage.set(StorageKey.TOKEN, token);

    await dispatch(loadUser());
    return { token };
});

const loadUser = createAsyncThunk<
    UserLoadResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/authenticated-user`, async (_registerPayload, { extra }) => {
    const { authApi, storage } = extra;

    const token = storage.getSync(StorageKey.TOKEN) as string;

    return await authApi.loadUser({ token });
});

export { loadUser, signIn, signUp };
