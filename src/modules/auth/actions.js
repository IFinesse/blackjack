import { createAction, ACTIONS_SUBTYPES } from '~/modules/utils/actions';

export const SET_USER_BIOMETRIC_ANSWER = createAction('SET_USER_BIOMETRIC_ANSWER', {
  [ACTIONS_SUBTYPES.STATE]: (answer) => ({ answer }),
});

export const SIGN_IN_EMAIL = createAction(
  'SIGN_IN_EMAIL',
  {
    [ACTIONS_SUBTYPES.START]: (username, password, accessKey) => ({
      username: username,
      password: password,
      accessKey: accessKey,
    }),
    [ACTIONS_SUBTYPES.SUCCESS]: (response) => ({
      ...response,
    }),
    [ACTIONS_SUBTYPES.FAILED]: (reason) => ({
      ...reason,
    }),
  },
  false,
  true,
);

export const LOCALIZATION = createAction(
  'LOCALIZATION',
  {
    [ACTIONS_SUBTYPES.START]: (languageTag) => ({ languageTag }),
    [ACTIONS_SUBTYPES.SUCCESS]: (response) => ({
      ...response,
    }),
    [ACTIONS_SUBTYPES.FAILED]: (reason) => ({
      reason,
    }),
  },
  false,
  true,
);

export const SIGN_OUT = createAction(
  'SIGN_OUT',
  {
    [ACTIONS_SUBTYPES.START]: true,
    [ACTIONS_SUBTYPES.SUCCESS]: true,
    [ACTIONS_SUBTYPES.FAILED]: true,
  },
  false,
  true,
);
