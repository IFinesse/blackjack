import {createAction, ACTIONS_SUBTYPES} from '~/modules/utils/actions';

export const STATE_REHYDRATION = createAction('STATE_REHYDRATION', {
  [ACTIONS_SUBTYPES.DONE]: true,
});

export const TOGGLE_GLOBAL_ERROR = createAction('TOGGLE_GLOBAL_ERROR', {
  [ACTIONS_SUBTYPES.STATE]: true,
});
