import {
    createTransaction,
    deleteTransaction,
    loadTransactions,
    updateTransaction,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};

export { allActions as actions };
export { reducer } from './slice.js';
