import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  FETCH_LOGS_REQUEST,
  FETCH_LOGS_SUCCESS,
  FETCH_LOGS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/logs";

//Fetch Logs
export const fetchLogs = () => async (dispatch) => {
  dispatch({ type: FETCH_LOGS_REQUEST });
  const token = cookie.load("token");
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}log/get`,
      headers: {
        "x-access-token": token,
      },
    });
    const { data } = response;
    // console.log("A", data);
    dispatch({
      type: FETCH_LOGS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    // console.log(error)
    dispatch({
      type: FETCH_LOGS_FAIL,
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
