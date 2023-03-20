import { signIn } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signIn,
};

export { allActions as actions };
export { reducer } from './slice.js';
