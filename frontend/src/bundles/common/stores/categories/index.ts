import {
    createCategory,
    loadCategories,
    removeCategory,
    updateCategory,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadCategories,
    createCategory,
    updateCategory,
    removeCategory,
};

export { allActions as actions };
export { reducer } from './slice.js';
