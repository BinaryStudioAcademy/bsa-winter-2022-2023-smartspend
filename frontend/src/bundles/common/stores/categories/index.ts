import {
    createCategory,
    loadCategories,
    removeCategories,
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
    removeCategories,
};

export { allActions as actions };
export { reducer } from './slice.js';
