import {createAction, ACTIONS_SUBTYPES} from '~/modules/utils/actions';

export const SIGN_IN_EMAIL = createAction(
  'SIGN_IN_EMAIL',
  {
    [ACTIONS_SUBTYPES.START]: (email, password) => ({
      email,
      password,
    }),
    [ACTIONS_SUBTYPES.SUCCESS]: response => ({
      ...response,
    }),
    [ACTIONS_SUBTYPES.FAILED]: reason => ({
      ...reason,
    }),
  },
  false,
  true,
);
