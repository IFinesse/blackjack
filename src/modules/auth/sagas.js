import {all, takeLatest, put, select, call} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {SIGN_IN_EMAIL, SIGN_OUT, LOCALIZATION} from '~/modules/auth/actions';
import {getTokenSelector} from './selectors';
import api from '~/api';

export function* signInWithEmailSaga(action) {
  const {
    payload: {email, password},
  } = action;
  console.log('bla saga sign in');
  // const {response, error} = yield api.signIn({
  //   email,
  //   password,
  // });
  // if (response?.extensions?.salesChannel?.accessKey) {
  //   yield call(storeAccessKey, response.extensions.salesChannel.accessKey);
  // }
  // if (error) {
  //   yield put(SIGN_IN_EMAIL.FAILED.create(error));
  // } else if (response) {
  //   yield put(SIGN_IN_EMAIL.SUCCESS.create(response));
  // }
}

function* rootSaga() {
  yield all([takeLatest(SIGN_IN_EMAIL.START.type, signInWithEmailSaga)]);
}

export default rootSaga;
