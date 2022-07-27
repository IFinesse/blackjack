import {all} from 'redux-saga/effects';

import {watchSecondaryEventChannelSaga} from './utils/secondaryEventChannelListener';
import authRootSaga from './auth/sagas';
import profileRootSaga from './profile/sagas';
import addressesRootSaga from './addresses/sagas';
import devicesRootSaga from './devices/sagas';
import ordersRootSaga from './orders/sagas';
import productRootSaga from './product/sagas';
import cartRootSaga from './cart/sagas';
import checkoutRootSaga from './checkout/sagas';
import networkRootSaga from './network/sagas';
import languageRootSaga from './language/sagas';
import errorRootSaga from './error/sagas';
import signUpRootSaga from './signUp/sagas';
import notificationsRootSaga from './notifications/sagas';
import dashboardRootSaga from './dashboard/sagas';
import newsRootSaga from './news/sagas';
import shoppingListRootSaga from './shoppingList/sagas';
import videoRootSaga from './video/sagas';
import eventsRootSaga from './events/sagas';
import productRequestRootSaga from './productRequest/sagas';
import chatRootSaga from './chat/sagas';
import contractsRootSaga from './contracts/sagas';
import offlineEventsRootSaga from './offlineEvents/sagas';
import blogRootSaga from './blog/sagas';
import searchRootSaga from './search/sagas';
import persistRehydration from './persistRehydration/sagas';

function* rootSaga() {
  yield all([
    watchSecondaryEventChannelSaga(),
    authRootSaga(),
    profileRootSaga(),
    addressesRootSaga(),
    devicesRootSaga(),
    ordersRootSaga(),
    productRootSaga(),
    cartRootSaga(),
    checkoutRootSaga(),
    networkRootSaga(),
    languageRootSaga(),
    errorRootSaga(),
    signUpRootSaga(),
    notificationsRootSaga(),
    dashboardRootSaga(),
    newsRootSaga(),
    shoppingListRootSaga(),
    videoRootSaga(),
    eventsRootSaga(),
    productRequestRootSaga(),
    chatRootSaga(),
    persistRehydration(),
    contractsRootSaga(),
    offlineEventsRootSaga(),
    blogRootSaga(),
    searchRootSaga(),
  ]);
}

export default rootSaga;
