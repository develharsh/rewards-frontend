import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { user } from "./reducers/user";
import { voucher } from "./reducers/voucher";
import { logs } from "./reducers/logs";
const reducer = combineReducers({
  user,
  voucher,
  logs
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
