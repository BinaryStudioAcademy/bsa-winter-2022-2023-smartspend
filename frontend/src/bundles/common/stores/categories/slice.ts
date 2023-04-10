import { createSlice } from '@reduxjs/toolkit';
import {
    type CategoryGetAllItemResponseDto,
    type CategoryGetAllResponseDto,
} from 'shared/build/index.js';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { loadCategories } from './actions.js';

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
        builder.addCase(loadCategories.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.isLoaded = false;
        });
        builder.addCase(loadCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            const sortByType: Record<string, CategoryGetAllItemResponseDto[]> =
                {};
            for (const data of state.categories.items) {
                if (!(data.type in sortByType)) {
                    sortByType[data.type] = [];
                }
                sortByType[data.type].push(data);
            }
            state.categoriesSortByType = sortByType;
            state.dataStatus = DataStatus.FULFILLED;
            state.isLoaded = true;
        });
        builder.addCase(loadCategories.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.isLoaded = false;
        });
    },
});

export { actions, name, reducer };
