import { all, put, cancelled, debounce } from 'redux-saga/effects';
import { SIGN_OUT, SIGN_IN_EMAIL, LOCALIZATION } from '~/modules/auth/actions';
import { LOAD_ADDRESSES } from '~/modules/addresses/actions';
import { LOAD_DEVICES, SUPPORT_REQUEST, LOAD_SUPPORT_REQUESTS } from '~/modules/devices/actions';
import { SWITCH_LANGUAGE } from '~/modules/language/actions';
import {
  ADD_TO_CART,
  LOAD_CART,
  REMOVE_PRODUCT_FROM_CART,
  CHANGE_PRODUCT_QUANTITY,
  PRODUCT_NOT_FOUND,
  SUGGEST_EAN,
  ADD_PRODUCTS_TO_CART,
  UPDATE_EXISTING_PRODUCT_QUANTITY,
} from '~/modules/cart/actions';
import { PROCEED_TO_CHECKOUT, UPDATE_CONTEXT, CONFIRM_ORDER } from '~/modules/checkout/actions';
import {
  LOAD_SHOPPING_LISTS,
  LOAD_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
  ADD_TO_SHOPPING_LIST,
  CHANGE_PRODUCT_QTY,
  UPDATE_EXISTING_PRODUCT_QTY,
  REMOVE_PRODUCT,
  DELETE_SHOPPING_LIST,
} from '~/modules/shoppingList/actions';
import { LOAD_ORDERS, DOWNLOAD_PDF, REORDER } from '~/modules/orders/actions';
import { SEARCH_PRODUCT, LOAD_PRODUCTS, PRODUCTS_BY_NUMBER } from '~/modules/product/actions';
import { LOAD_PROFILE } from '~/modules/profile/actions';
import { NETWORK_CONNECTION_FAILED } from '~/modules/network/actions';
import { REGISTER } from '~/modules/signUp/actions';
import { CREATE_PRODUCT_REQUEST } from '~/modules/productRequest/actions';
import { TOGGLE_GLOBAL_ERROR } from '~/modules/actions';
import { LOAD_EVENTS, CREATE_EVENT, UPDATE_EVENT } from '~/modules/events/actions';

function* hideErrorSaga() {
  yield put(TOGGLE_GLOBAL_ERROR.STATE.create());
}

function* rootSaga() {
  yield all([
    debounce(1000, SIGN_OUT.FAILED.type, hideErrorSaga),
    debounce(7000, SIGN_IN_EMAIL.FAILED.type, hideErrorSaga),
    debounce(7000, LOCALIZATION.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_ADDRESSES.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_DEVICES.FAILED.type, hideErrorSaga),
    debounce(7000, SWITCH_LANGUAGE.FAILED.type, hideErrorSaga),
    debounce(7000, ADD_TO_CART().FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_CART.FAILED.type, hideErrorSaga),
    debounce(7000, REMOVE_PRODUCT_FROM_CART.FAILED.type, hideErrorSaga),
    debounce(7000, CHANGE_PRODUCT_QUANTITY.FAILED.type, hideErrorSaga),
    debounce(7000, PRODUCT_NOT_FOUND.FAILED.type, hideErrorSaga),
    debounce(7000, PROCEED_TO_CHECKOUT.FAILED.type, hideErrorSaga),
    debounce(7000, UPDATE_CONTEXT.FAILED.type, hideErrorSaga),
    debounce(7000, CONFIRM_ORDER.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_ORDERS.FAILED.type, hideErrorSaga),
    debounce(7000, DOWNLOAD_PDF.FAILED.type, hideErrorSaga),
    debounce(7000, REORDER.FAILED.type, hideErrorSaga),
    debounce(7000, SEARCH_PRODUCT.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_PRODUCTS.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_PROFILE.FAILED.type, hideErrorSaga),
    debounce(7000, REGISTER.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_SHOPPING_LISTS.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_SHOPPING_LIST.FAILED.type, hideErrorSaga),
    debounce(7000, CREATE_SHOPPING_LIST.FAILED.type, hideErrorSaga),
    debounce(7000, ADD_TO_SHOPPING_LIST.FAILED.type, hideErrorSaga),
    debounce(7000, CHANGE_PRODUCT_QTY.FAILED.type, hideErrorSaga),
    debounce(7000, UPDATE_EXISTING_PRODUCT_QTY.FAILED.type, hideErrorSaga),
    debounce(7000, UPDATE_EXISTING_PRODUCT_QUANTITY.FAILED.type, hideErrorSaga),
    debounce(7000, REMOVE_PRODUCT.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_SUPPORT_REQUESTS.FAILED.type, hideErrorSaga),
    debounce(7000, SUPPORT_REQUEST.FAILED.type, hideErrorSaga),
    debounce(7000, DELETE_SHOPPING_LIST.FAILED.type, hideErrorSaga),
    debounce(7000, PRODUCTS_BY_NUMBER.FAILED.type, hideErrorSaga),
    debounce(7000, ADD_PRODUCTS_TO_CART.FAILED.type, hideErrorSaga),
    debounce(7000, NETWORK_CONNECTION_FAILED.DONE.type, hideErrorSaga),
    debounce(7000, NETWORK_CONNECTION_FAILED.DONE.type, hideErrorSaga),
    debounce(7000, CREATE_PRODUCT_REQUEST.FAILED.type, hideErrorSaga),
    debounce(7000, LOAD_EVENTS.FAILED.type, hideErrorSaga),
    debounce(7000, CREATE_EVENT.FAILED.type, hideErrorSaga),
    debounce(7000, UPDATE_EVENT.FAILED.type, hideErrorSaga),
    debounce(1500, ADD_TO_CART().SUCCESS.type, hideErrorSaga),
    debounce(1500, SUGGEST_EAN.SUCCESS.type, hideErrorSaga),
    debounce(1500, PRODUCT_NOT_FOUND.SUCCESS.type, hideErrorSaga),
    debounce(3500, SUPPORT_REQUEST.SUCCESS.type, hideErrorSaga),
    debounce(1500, REGISTER.SUCCESS.type, hideErrorSaga),
    debounce(7000, ADD_TO_SHOPPING_LIST.SUCCESS.type, hideErrorSaga),
    debounce(7000, CREATE_PRODUCT_REQUEST.SUCCESS.type, hideErrorSaga),
    debounce(7000, UPDATE_EXISTING_PRODUCT_QTY.SUCCESS.type, hideErrorSaga),
    debounce(7000, UPDATE_EXISTING_PRODUCT_QUANTITY.SUCCESS.type, hideErrorSaga),
  ]);
}

export default rootSaga;
