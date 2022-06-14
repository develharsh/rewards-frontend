import {
  FETCH_LOGS_REQUEST,
  FETCH_LOGS_SUCCESS,
  FETCH_LOGS_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/logs";

export const logs = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LOGS_REQUEST:
      return {};
    case FETCH_LOGS_SUCCESS:
      return { ...state, logs: action.payload };
    case FETCH_LOGS_FAIL:
      return { ...state, logs: [], error: action.payload };
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
