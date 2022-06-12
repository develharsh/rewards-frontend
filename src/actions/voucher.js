import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  FETCH_VOUCHERS_REQUEST,
  FETCH_VOUCHERS_SUCCESS,
  FETCH_VOUCHERS_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/voucher";

//Fetch Vouchers
export const fetchVouchers = (page) => async (dispatch) => {
  dispatch({ type: FETCH_VOUCHERS_REQUEST });
  const token = cookie.load("token");
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}get-vouchers?page=${page}`,
      headers: {
        "x-access-token": token,
      },
    });
    const { data } = response;
    dispatch({
      type: FETCH_VOUCHERS_SUCCESS,
      payload: data.data.getVouchers.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_VOUCHERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Place Order
export const placeOrder = (order) => async (dispatch) => {
  dispatch({ type: PLACE_ORDER_REQUEST });
  const token = cookie.load("token");
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}place-order`,
      headers: {
        "x-access-token": token,
      },
      data: order,
    });
    const { data } = response;
    // console.log(data)
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data.data.data.placeOrder.data
    });
  } catch (error) {
    // console.log(error)
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
