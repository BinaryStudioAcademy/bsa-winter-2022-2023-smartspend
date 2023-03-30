import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import { type WalletGetAllResponseDto } from '~/bundles/wallets/wallets.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    WalletGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(sliceName, (_, { extra }) => {
    const { walletsApi } = extra;

    return walletsApi.getAll();
});

export { loadAll };
