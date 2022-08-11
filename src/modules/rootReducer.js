import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import requestReducer from './requestStatuses/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import addressesReducer from './addresses/reducer';
import devicesReducer from './devices/reducer';
import ordersReducer from './orders/reducer';
import productReducer from './product/reducer';
import cartReducer from './cart/reducer';
import checkoutReducer from './checkout/reducer';
import languageReducer from './language/reducer';
import errorReducer from './error/reducer';
import signUpReducer from './signUp/reducer';
import notificationsReducer from './notifications/reducer';
import dashboardReducer from './dashboard/reducer';
import newsReducer from './news/reducer';
import shoppingListReducer from './shoppingList/reducer';
import videoReducer from './video/reducer';
import eventsReducer from './events/reducer';
import productRequestReducer from './productRequest/reducer';
import chatReducer from './chat/reducer';
import contractsReducer from './contracts/reducer';
import offlineEventsReducer from './offlineEvents/reducer';
import blogReducer from './blog/reducer';
import searchReducer from './search/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 120000,
};

const reducers = combineReducers({
  requestsStatuses: requestReducer,
  auth: authReducer,
  profile: profileReducer,
  addresses: addressesReducer,
  devices: devicesReducer,
  orders: ordersReducer,
  product: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  language: languageReducer,
  error: errorReducer,
  signUp: signUpReducer,
  notifications: notificationsReducer,
  dashboard: dashboardReducer,
  news: newsReducer,
  shoppingList: shoppingListReducer,
  video: videoReducer,
  events: eventsReducer,
  productRequest: productRequestReducer,
  chat: chatReducer,
  contracts: contractsReducer,
  offlineEvents: offlineEventsReducer,
  blog: blogReducer,
  search: searchReducer,
});

export default persistReducer(persistConfig, reducers);
