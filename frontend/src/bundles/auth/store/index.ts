import { signIn, signUp, toggleSignUpModalOpen } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signIn,
    toggleSignUpModalOpen,
};

export { allActions as actions };
export { reducer } from './slice.js';
