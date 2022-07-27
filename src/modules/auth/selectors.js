import { createSelector } from 'reselect';
import i18n from 'i18n-js';
import get from 'lodash/get';

const authRootSelector = (state) => state.auth;

export const getTokenSelector = (state) => authRootSelector(state).contextToken;

const localizationInfoSelector = (state) => authRootSelector(state).localizationInfo;

const getLanguageSelector = (state) =>
  Object.values(localizationInfoSelector(state)).filter((item) => {
    let locale;
    switch (i18n.locale) {
      case 'de':
      case 'fr':
        locale = i18n.locale + '-CH';
        break;
      default:
      case 'en':
        locale = i18n.locale + '-GB';
        break;
    }
    return item.translationCode.code === locale;
  });

export const getLanguageIdSelector = (state) => {
  const [language] = getLanguageSelector(state);
  return get(language, 'id', null);
};

export const getLanguageCode = createSelector(getLanguageSelector, ([language]) =>
  get(language, ['translationCode', 'code'], null),
);

export const getSignInLocationCode = createSelector(authRootSelector, (root) =>
  get(root, ['extensions', 'salesChannel', 'code'], null),
);

export const selectDoesUserWantUseBiometrics = createSelector(authRootSelector, (root) => {
  return root?.doesUserWantUseBiometrics;
});
