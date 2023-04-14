import { create, getOne, loadAll, remove, update } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    create,
    remove,
    update,
    getOne,
};

export { allActions as actions };
export { reducer } from './slice.js';
