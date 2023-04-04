import { loadAll, updateUser } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    updateUser,
};

export { allActions as actions };
export { reducer } from './slice.js';
