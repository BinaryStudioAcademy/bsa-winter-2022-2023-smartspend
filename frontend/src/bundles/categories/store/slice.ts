import { type PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CategoryState {
    checkedCategory: string[];
}

const initialState: CategoryState = {
    checkedCategory: [],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addChecked: (state, action: PayloadAction<string>) => {
            state.checkedCategory.push(action.payload);
        },
        removeChecked: (state, action: PayloadAction<string>) => {
            state.checkedCategory = state.checkedCategory.filter(
                (id) => id !== action.payload,
            );
        },
        clearChecked: (state) => {
            state.checkedCategory = [];
        },
    },
});

export { categoriesSlice };
