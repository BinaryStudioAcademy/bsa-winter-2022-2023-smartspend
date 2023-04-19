import {
    createTransaction,
    deleteTransaction,
    loadTransactions,
    removeTransactions,
    updateTransaction,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    loadTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    removeTransactions,
};

export { allActions as actions };
export { reducer } from './slice.js';
