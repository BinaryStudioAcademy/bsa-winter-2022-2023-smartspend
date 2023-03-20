import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, (loginPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signIn(loginPayload);
});

export { signIn };
