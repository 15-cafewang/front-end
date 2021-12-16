import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// import slice module
import userSlice from "./Modules/userSlice";
import userPageSlice from "./Modules/userPageSlice";
import modalSlice from "./Modules/modalSlice";
import bulletinBoardSlice from "./Modules/bulletinBoardSlice";
import cafeBoardSlice from "./Modules/cafeBoardSlice";
import mainPageSlice from "./Modules/mainPageSlice";
import searchSlice from "./Modules/searchSlice";
import popUpSlice from "./Modules/popupSlice";

import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

export const history = createBrowserHistory();

const searchPersistConfig = {
  key: "Search",
  storage: storage,
  whitelist: ["cafeSearchList", "boardSearchList"],
};

const reducer = combineReducers({
  router: connectRouter(history),
  user: userSlice.reducer,
  userPage: userPageSlice.reducer,
  modal: modalSlice.reducer,
  bulletinBoard: bulletinBoardSlice.reducer,
  cafeBoard: cafeBoardSlice.reducer,
  mainPage: mainPageSlice.reducer,
  search: persistReducer(searchPersistConfig, searchSlice.reducer),
  popUp: popUpSlice.reducer,
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
