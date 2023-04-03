import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CategoryState {
    selectedCategory: string[];
}

const initialState: CategoryState = {
    selectedCategory: [],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory.push(action.payload);
        },
        removeSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = state.selectedCategory.filter(
                (id) => id !== action.payload,
            );
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = [];
        },
    },
});

export { categoriesSlice };
