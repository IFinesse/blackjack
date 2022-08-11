import {
  SIGN_IN_EMAIL,
  SIGN_OUT,
  LOCALIZATION,
  SET_USER_BIOMETRIC_ANSWER,
} from './actions.js';
import {UPDATE_CONTEXT} from '~/modules/checkout/actions';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import PERSIST_TIMEOUT from '~/constants';

const initialState = {
  isSignedIn: false,
  spinnerState: {
    loginLoading: false,
  },
};

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  timeout: PERSIST_TIMEOUT,
  blacklist: ['spinnerState'],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_EMAIL.SUCCESS.type:
      return {
        ...state,
        ...action.payload,
        isSignedIn: true,
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, reducer);
