import { createAsyncThunk } from '@reduxjs/toolkit';

import { type BudgetCreateRequestDto } from '~/bundles/budgets/budgets.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type BudgetSliceResponseDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    BudgetSliceResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
    const { budgetsApi } = extra;

    return await budgetsApi.getAll();
});

const create = createAsyncThunk<
    Promise<void>,
    BudgetCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create`, async (budgetsPayload, { extra, dispatch }) => {
    const { budgetsApi } = extra;

    await budgetsApi.createBudget(budgetsPayload);

    await dispatch(loadAll());
});

const remove = createAsyncThunk<Promise<void>, string, AsyncThunkConfig>(
    `${sliceName}/delete`,
    async (id, { extra }) => {
        const { budgetsApi } = extra;

        await budgetsApi.deleteBudget(id);
    },
);

const update = createAsyncThunk<
    Promise<void>,
    { id: string; payload: BudgetCreateRequestDto },
    AsyncThunkConfig
>(`${sliceName}/delete`, async ({ id, payload }, { extra, dispatch }) => {
    const { budgetsApi } = extra;

    await budgetsApi.updateBudget({ id, payload });

    await dispatch(loadAll());
});

export { create, loadAll, remove, update };
