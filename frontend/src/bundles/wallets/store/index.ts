import { create, loadAll, remove, update } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    create,
    remove,
    update,
};

export { allActions as actions };
export { reducer } from './slice.js';
