import { channel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';

export const secondaryEventChannel = channel();

export function* watchSecondaryEventChannelSaga() {
  while (true) {
    const action = yield take(secondaryEventChannel);
    yield put(action);
  }
}
