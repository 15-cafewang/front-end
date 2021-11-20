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
import searchSlice from "./Modules/searchSlice";

import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
export const history = createBrowserHistory();

const userPagePersistConfig = {
  key: "userPage",
  storage: storageSession,
  whitelist: ["isFollower"],
};

const searchPersistConfig = {
  key: "Search",
  storage: storage,
  whitelist: ["whereFrom", "recipeSearchList", "boardSearchList"],
};

const reducer = combineReducers({
  router: connectRouter(history),
  user: userSlice.reducer,
  userPage: persistReducer(userPagePersistConfig, userPageSlice.reducer),
  modal: modalSlice.reducer,
  bulletinBoard: bulletinBoardSlice.reducer,
  recipeBoard: recipeBoardSlice.reducer,
  mainPage: mainPageSlice.reducer,
  search: persistReducer(searchPersistConfig, searchSlice.reducer),
});

const middlewares = [];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: reducer,
  middleware: [...middlewares, ...customizedMiddleware],
  devTools: env !== "production",
});

const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export { store, persistor };
