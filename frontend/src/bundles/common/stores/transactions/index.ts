import { loadTransactions } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadTransactions,
};

export { allActions as actions };
export { reducer } from './slice.js';
