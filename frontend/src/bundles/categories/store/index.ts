import { categoriesSlice } from './slice';

const allActions = {
    ...categoriesSlice.actions,
};

const categoryReducer = categoriesSlice.reducer;

export { allActions as categoriesSlice };
export { categoryReducer };