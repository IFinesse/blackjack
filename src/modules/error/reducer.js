import { SIGN_OUT, SIGN_IN_EMAIL, LOCALIZATION } from '~/modules/auth/actions';
import { NETWORK_CONNECTION_FAILED } from '~/modules/network/actions';
import { LOAD_ADDRESSES } from '~/modules/addresses/actions';
import { LOAD_DEVICES, SUPPORT_REQUEST, LOAD_SUPPORT_REQUESTS } from '~/modules/devices/actions';
import { SWITCH_LANGUAGE } from '~/modules/language/actions';
import {
  ADD_TO_CART,
  LOAD_CART,
  REMOVE_PRODUCT_FROM_CART,
  CHANGE_PRODUCT_QUANTITY,
  UPDATE_EXISTING_PRODUCT_QUANTITY,
  PRODUCT_NOT_FOUND,
  SUGGEST_EAN,
  ADD_PRODUCTS_TO_CART,
} from '~/modules/cart/actions';
import { PROCEED_TO_CHECKOUT, UPDATE_CONTEXT, CONFIRM_ORDER } from '~/modules/checkout/actions';
import { LOAD_ORDERS, DOWNLOAD_PDF, REORDER } from '~/modules/orders/actions';
import { SEARCH_PRODUCT, LOAD_PRODUCTS, PRODUCTS_BY_NUMBER } from '~/modules/product/actions';
import { LOAD_PROFILE } from '~/modules/profile/actions';
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
import { LOAD_EVENTS, CREATE_EVENT, UPDATE_EVENT } from '~/modules/events/actions';
import { TOGGLE_GLOBAL_ERROR } from '~/modules/actions';
import { REGISTER } from '~/modules/signUp/actions';
import { CREATE_PRODUCT_REQUEST } from '~/modules/productRequest/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import PERSIST_TIMEOUT from '~/constants';
import { translations } from '~/utils/i18n';
import find from 'lodash/find';

const initialState = {
  show: false,
  title: null,
  message: null,
};

const persistConfig = {
  key: 'error',
  storage: AsyncStorage,
  timeout: PERSIST_TIMEOUT,
  blacklist: ['message', 'title', 'show'],
};

const getLabel = ({ productId, data }) => {
  let product = find(data.lineItems, ['id', productId]);
  if (!product) {
    product = find(data.lineItems, ['referencedId', productId]);
  }
  return product.label || '-';
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ADDRESSES.FAILED.type:
    case LOCALIZATION.FAILED.type:
    case SIGN_OUT.FAILED.type:
    case ADD_TO_CART().FAILED.type:
    case LOAD_CART.FAILED.type:
    case REMOVE_PRODUCT_FROM_CART.FAILED.type:
    case CHANGE_PRODUCT_QUANTITY.FAILED.type:
    case PRODUCT_NOT_FOUND.FAILED.type:
    case PROCEED_TO_CHECKOUT.FAILED.type:
    case UPDATE_CONTEXT.FAILED.type:
    case CONFIRM_ORDER.FAILED.type:
    case LOAD_DEVICES.FAILED.type:
    case SWITCH_LANGUAGE.FAILED.type:
    case LOAD_ORDERS.FAILED.type:
    case DOWNLOAD_PDF.FAILED.type:
    case REORDER.FAILED.type:
    case SEARCH_PRODUCT.FAILED.type:
    case LOAD_PRODUCTS.FAILED.type:
    case LOAD_PROFILE.FAILED.type:
    case REGISTER.FAILED.type:
    case NETWORK_CONNECTION_FAILED.DONE.type:
    case LOAD_SHOPPING_LISTS.FAILED.type:
    case LOAD_SHOPPING_LIST.FAILED.type:
    case CREATE_SHOPPING_LIST.FAILED.type:
    case ADD_TO_SHOPPING_LIST.FAILED.type:
    case CHANGE_PRODUCT_QTY.FAILED.type:
    case REMOVE_PRODUCT.FAILED.type:
    case SUPPORT_REQUEST.FAILED.type:
    case LOAD_SUPPORT_REQUESTS.FAILED.type:
    case DELETE_SHOPPING_LIST.FAILED.type:
    case PRODUCTS_BY_NUMBER.FAILED.type:
    case ADD_PRODUCTS_TO_CART.FAILED.type:
    case CREATE_PRODUCT_REQUEST.FAILED.type:
    case UPDATE_EVENT.FAILED.type:
    case LOAD_EVENTS.FAILED.type:
    case CREATE_EVENT.FAILED.type:
    case UPDATE_EXISTING_PRODUCT_QUANTITY.FAILED.type:
    case UPDATE_EXISTING_PRODUCT_QTY.FAILED.type:
      return {
        show: true,
        title: translations('information_message.error'),
        message: action.payload.reason,
      };
    case SIGN_IN_EMAIL.FAILED.type:
      return {
        show: true,
        title: translations('information_message.error'),
        message:
          action.payload.code === 'CHECKOUT__CUSTOMER_IS_INACTIVE'
            ? 'The customer is inactive'
            : action.payload.message,
      };
    case ADD_TO_CART().SUCCESS.type: {
      const label = getLabel(action.payload);
      return {
        show: true,
        title: translations('information_message.success'),
        message: `${label} ${translations('information_message.added')}`,
      };
    }
    case SUPPORT_REQUEST.SUCCESS.type:
      return {
        show: true,
        title: translations('information_message.success'),
        message: translations('information_message.success_technical_support'),
      };
    case PRODUCT_NOT_FOUND.SUCCESS.type:
    case SUGGEST_EAN.SUCCESS.type:
      return {
        show: true,
        title: translations('information_message.success'),
        message: translations('information_message.thank_you'),
      };
    case REGISTER.SUCCESS.type:
      return {
        show: true,
        title: translations('information_message.success'),
        message: translations('information_message.success_register'),
      };
    case TOGGLE_GLOBAL_ERROR.STATE.type:
      return {
        show: false,
        title: null,
        message: null,
      };
    case SIGN_OUT.SUCCESS.type:
      return {
        ...initialState,
      };
    case ADD_TO_SHOPPING_LIST.SUCCESS.type:
      return {
        show: true,
        title: translations('information_message.success'),
        message: `${action.payload.name} ${translations('information_message.added')}`,
      };
    case UPDATE_EXISTING_PRODUCT_QUANTITY.SUCCESS.type:
    case UPDATE_EXISTING_PRODUCT_QTY.SUCCESS.type:
      return {
        show: true,
        title: translations('information_message.success'),
        message: `${action.payload.name} ${translations('information_message.product_qty_was_updated_message')} ${
          action.payload.quantity
        }`,
      };
    case CREATE_PRODUCT_REQUEST.SUCCESS.type:
      return {
        show: true,
        title: translations('information_message.success'),
        message: translations('information_message.success_technical_support'),
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, reducer);
