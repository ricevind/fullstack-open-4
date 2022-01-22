import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { blogsApi } from "../services/blogs";

import { userApi } from "../services/login";
import { usersApi } from "../services/users";
import { authSlice } from "./auth.store";
import { notificationsSlice } from "./notifications.store";

const combinedReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [notificationsSlice.name]: notificationsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  if (action.type === "app/logout") {
    state = {} as AppState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      blogsApi.middleware,
      usersApi.middleware
    ),
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof combinedReducer>;
