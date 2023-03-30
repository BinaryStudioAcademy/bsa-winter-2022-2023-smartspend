import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserLoadResponseDto,
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    Promise<void>,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signUp(registerPayload);

    void storage.set(StorageKey.TOKEN, token);

    await dispatch(loadUser());
});

const signIn = createAsyncThunk<
    Promise<void>,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signIn(registerPayload);

    void storage.set(StorageKey.TOKEN, token);

    await dispatch(loadUser());
});

const loadUser = createAsyncThunk<
    UserLoadResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/authenticated-user`, async (_registerPayload, { extra }) => {
    const { authApi } = extra;

    return await authApi.loadUser();
});

export { loadUser, signIn, signUp };
