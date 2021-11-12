import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// import slice module
import userSlice from "./Modules/userSlice";
import userPageSlice from "./Modules/userPageSlice";
import modalSlice from "./Modules/modalSlice";
import bulletinBoardSlice from "./Modules/bulletinBoardSlice";
import recipeBoardSlice from "./Modules/recipeBoardSlice";
import mainPageSlice from "./Modules/mainPageSlice";
export const history = createBrowserHistory();

// reducers
const reducer = combineReducers({
  router: connectRouter(history),
  user: userSlice.reducer,
  userPage: userPageSlice.reducer,
  modal: modalSlice.reducer,
  bulletinBoard: bulletinBoardSlice.reducer,
  recipeBoard: recipeBoardSlice.reducer,
  mainPage: mainPageSlice.reducer,
});

const middlewares = [];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const store = configureStore({
  reducer,
  middleware: [...middlewares, ...getDefaultMiddleware()],
  devTools: env !== "production",
});

export default store;
