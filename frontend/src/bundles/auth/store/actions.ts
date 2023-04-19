import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { actions as userActions } from '../../users/store';
import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    Promise<void>,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signUp(registerPayload);

    void storage.set(StorageKey.TOKEN, token);

    await dispatch(userActions.loadUser());
});

const signIn = createAsyncThunk<
    Promise<void>,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (registerPayload, { extra, dispatch }) => {
    const { authApi, storage } = extra;

    const { token } = await authApi.signIn(registerPayload);

    void storage.set(StorageKey.TOKEN, token);

    await dispatch(userActions.loadUser());
});

const toggleSignUpModalOpen = createAction(`${sliceName}/sign-up-modal-state`);

export { signIn, signUp, toggleSignUpModalOpen };
