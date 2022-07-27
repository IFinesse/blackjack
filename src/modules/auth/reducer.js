import { SIGN_IN_EMAIL, SIGN_OUT, LOCALIZATION, SET_USER_BIOMETRIC_ANSWER } from './actions.js';
import { UPDATE_CONTEXT } from '~/modules/checkout/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import PERSIST_TIMEOUT from '~/constants';

const initialState = {
  apiAlias: undefined,
  contextToken: undefined,
  salesChannelInfo: {},
  isSignedIn: false,
  localizationInfo: [],
  spinnerState: {
    loginLoading: false,
  },
  doesUserWantUseBiometrics: undefined,
};

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  timeout: PERSIST_TIMEOUT,
  blacklist: ['spinnerState'],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONTEXT.SUCCESS.type:
    case SIGN_IN_EMAIL.SUCCESS.type:
      return {
        ...state,
        ...action.payload,
        isSignedIn: true,
      };
    case LOCALIZATION.SUCCESS.type:
      return {
        ...state,
        localizationInfo: action.payload.elements,
      };

    case SET_USER_BIOMETRIC_ANSWER.STATE.type:
      return {
        ...state,
        doesUserWantUseBiometrics: action.payload.answer,
      };
    case SIGN_OUT.SUCCESS.type:
      return {
        ...initialState,
        doesUserWantUseBiometrics: state.doesUserWantUseBiometrics,
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, reducer);
