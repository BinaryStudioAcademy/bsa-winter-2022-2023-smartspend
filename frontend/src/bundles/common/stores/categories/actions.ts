import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type CategoryGetAllResponseDto,
    type CategoryRequestDto,
    type CategoryUpdatePayloadDto,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const loadCategories = createAsyncThunk<
    CategoryGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-categories`, async (_, { extra }) => {
    const { categoriesApi } = extra;

    return await categoriesApi.loadCategories();
});

const createCategory = createAsyncThunk<
    Promise<void>,
    CategoryRequestDto,
    AsyncThunkConfig
>(
    `${sliceName}/create-category`,
    async (categoryPayload, { extra, dispatch }) => {
        const { categoriesApi } = extra;

        await categoriesApi.createCategory(categoryPayload);

        await dispatch(loadCategories());
    },
);

const updateCategory = createAsyncThunk<
    Promise<void>,
    { id: string; payload: CategoryUpdatePayloadDto },
    AsyncThunkConfig
>(
    `${sliceName}/update-category`,
    async ({ id, payload }, { extra, dispatch }) => {
        const { categoriesApi } = extra;

        await categoriesApi.updateCategory({ id, payload });

        await dispatch(loadCategories());
    },
);

const removeCategory = createAsyncThunk<
    Promise<void>,
    string,
    AsyncThunkConfig
>(`${sliceName}/delete-category`, async (id, { extra }) => {
    const { categoriesApi } = extra;

    await categoriesApi.deleteCategory(id);
});

export { createCategory, loadCategories, removeCategory, updateCategory };
