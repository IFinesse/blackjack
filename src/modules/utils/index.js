import { take } from 'redux-saga/effects';

export function createSagaForSubscription({ subscribeActionType, unsubscribeActionType }, subscribeFunction) {
  const actionForListen = [];

  if (subscribeActionType) {
    actionForListen.push(subscribeActionType);
  }
  if (unsubscribeActionType) {
    actionForListen.push(unsubscribeActionType);
  }

  return function* () {
    let unsubscribe;

    while (true) {
      const action = yield take(actionForListen);

      if (unsubscribe) {
        unsubscribe();
        unsubscribe = undefined;
      }

      if (action.type === unsubscribeActionType) {
        // Do not finish function with return, just wait for next actions
        continue;
      }

      // For multi subscription (just idea | Map<key, unsubscribe>)
      // const { key, unsubscribe } = subscribeFunction(action);
      unsubscribe = subscribeFunction(action);
    }
  };
}
