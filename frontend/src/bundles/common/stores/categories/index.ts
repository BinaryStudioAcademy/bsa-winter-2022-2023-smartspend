import { loadCategories } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadCategories,
};

export { allActions as actions };
export { reducer } from './slice.js';
