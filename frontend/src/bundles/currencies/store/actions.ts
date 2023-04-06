import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type CurrencyGetAllResponseDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    CurrencyGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { currencyApi } = extra;

    return currencyApi.getAll();
});

export { loadAll };
