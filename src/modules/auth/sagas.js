import { all, takeLatest, put, select, call } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { SIGN_IN_EMAIL, SIGN_OUT, LOCALIZATION } from '~/modules/auth/actions';
import { getTokenSelector } from './selectors';
import api from '~/api';

async function storeAccessKey(accessKey) {
  try {
    await AsyncStorage.setItem('accessKey', accessKey);
  } catch (error) {
    console.log('AsyncStorage error during access key store:', error);
  }
}

async function removeAccessKey() {
  try {
    await AsyncStorage.removeItem('accessKey');
  } catch (error) {
    console.log('AsyncStorage error during access key store:', error);
  }
}

async function removeLocale() {
  try {
    await AsyncStorage.removeItem('locale');
  } catch (error) {
    console.log('AsyncStorage error during removing locale:', error);
  }
}

async function removeFCMToken() {
  try {
    await AsyncStorage.removeItem('fcmToken');
  } catch (error) {
    console.log('AsyncStorage error during access key store:', error);
  }
}

async function getFCMToken() {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    return fcmToken;
  } catch (error) {
    console.log('AsyncStorage error during access key store:', error);
  }
}

export function* signInWithEmailSaga(action) {
  const {
    payload: { username, password, accessKey },
  } = action;
  const { response, error } = yield api.signIn({
    username,
    password,
    accessKey,
  });
  if (response?.extensions?.salesChannel?.accessKey) {
    yield call(storeAccessKey, response.extensions.salesChannel.accessKey);
  }
  if (error) {
    yield put(SIGN_IN_EMAIL.FAILED.create(error));
  } else if (response) {
    yield put(SIGN_IN_EMAIL.SUCCESS.create(response));
  }
}

export function* signOutSaga() {
  const contextToken = yield select(getTokenSelector);

  const fcmToken = yield call(getFCMToken);
  yield api.registerPushToken({ fcmToken, contextToken });
  yield call(removeFCMToken);

  const { response, error } = yield api.signOut(contextToken);

  if (error) {
    yield put(SIGN_OUT.FAILED.create(error.message));
  } else if (response) {
    yield call(removeAccessKey);
    yield call(removeLocale);
    yield put(SIGN_OUT.SUCCESS.create());
  }
}

function* localizationSaga() {
  const { response, error } = yield api.loadSupportedLanguages();

  if (error) {
    yield put(LOCALIZATION.FAILED.create(error.message));
  } else if (response) {
    yield put(LOCALIZATION.SUCCESS.create(response));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(SIGN_IN_EMAIL.START.type, signInWithEmailSaga),
    takeLatest(SIGN_OUT.START.type, signOutSaga),
    takeLatest(LOCALIZATION.START.type, localizationSaga),
  ]);
}

export default rootSaga;
