import { deleteUser, loadAll, loadUser, updateUser } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadAll,
    loadUser,
    updateUser,
    deleteUser,
};

export { allActions as actions };
export { reducer } from './slice.js';
