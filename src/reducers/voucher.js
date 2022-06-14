import {
  FETCH_VOUCHERS_REQUEST,
  FETCH_VOUCHERS_SUCCESS,
  FETCH_VOUCHERS_FAIL,
  FETCH_MYVOUCHERS_REQUEST,
  FETCH_MYVOUCHERS_SUCCESS,
  FETCH_MYVOUCHERS_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/voucher";

export const voucher = (state = {}, action) => {
  switch (action.type) {
    case FETCH_VOUCHERS_REQUEST:
    case FETCH_MYVOUCHERS_REQUEST:
      return {};
    case FETCH_VOUCHERS_SUCCESS:
      return { ...state, vouchers: action.payload };
    case FETCH_MYVOUCHERS_SUCCESS:
      return { ...state, myvouchers: action.payload };
    case FETCH_VOUCHERS_FAIL:
      return { ...state, vouchers: [], error: action.payload };
    case FETCH_MYVOUCHERS_FAIL:
      return { ...state, myvouchers: [], error: action.payload };
    case PLACE_ORDER_REQUEST:
      return { ...state, loading: true };
    case PLACE_ORDER_SUCCESS:
      return { ...state, message: action.payload, loading: false };
    case PLACE_ORDER_FAIL:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
