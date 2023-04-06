import {
    createTransaction,
    deleteTransaction,
    updateTransaction,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};

export { allActions as actions };
export { reducer } from './slice.js';
