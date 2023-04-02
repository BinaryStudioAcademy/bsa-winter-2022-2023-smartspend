import { createAsyncThunk } from '@reduxjs/toolkit';

import { type BudgetGetAllResponseDto } from '~/bundles/budgets/budgets.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    BudgetGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
    const { budgetsApi } = extra;

    return await budgetsApi.getAll();
});

export { loadAll };
