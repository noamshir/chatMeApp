import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import { chatReducer } from "./chat.reducer.js";
import { userReducer } from "./user.reducer.js";

const rootReducer = combineReducers({
  userModule: userReducer,
  chatModule: chatReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
