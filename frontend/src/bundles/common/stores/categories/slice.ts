import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    type CategoryGetAllItemResponseDto,
    type CategoryGetAllResponseDto,
} from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { getSortedCategoriesByType } from '../../helpers/helpers.js';
import {
    createCategory,
    loadCategories,
    removeCategories,
    removeCategory,
    updateCategory,
} from './actions.js';

type State = {
    categories: CategoryGetAllResponseDto | null;
    categoriesSortByType: Record<
        string,
        CategoryGetAllItemResponseDto[]
    > | null;
    dataStatus: ValueOf<typeof DataStatus>;
    isLoaded: boolean;
};

const initialState: State = {
    categories: null,
    categoriesSortByType: null,
    dataStatus: DataStatus.IDLE,
    isLoaded: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'categories',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.categoriesSortByType = getSortedCategoriesByType(
                state.categories,
            );
            state.dataStatus = DataStatus.FULFILLED;
            state.isLoaded = true;
        });
        builder.addMatcher(
            isAnyOf(
                createCategory.fulfilled,
                removeCategory.fulfilled,
                updateCategory.fulfilled,
                removeCategories.fulfilled,
            ),
            (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            },
        );
        builder.addMatcher(
            isAnyOf(
                loadCategories.pending,
                createCategory.pending,
                removeCategory.pending,
                updateCategory.pending,
                removeCategories.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                loadCategories.rejected,
                createCategory.rejected,
                removeCategory.rejected,
                updateCategory.rejected,
                removeCategories.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
