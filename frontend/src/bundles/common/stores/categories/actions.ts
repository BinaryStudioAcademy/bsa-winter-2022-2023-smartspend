import { createAsyncThunk } from '@reduxjs/toolkit';
import { type CategoryGetAllResponseDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const loadCategories = createAsyncThunk<
    CategoryGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/load-categories`, async (_, { extra }) => {
    const { categoriesApi } = extra;

    const categories = await categoriesApi.loadCategories();

    // eslint-disable-next-line no-console
    console.log('dsadasd');

    return categories;
});

export { loadCategories };
