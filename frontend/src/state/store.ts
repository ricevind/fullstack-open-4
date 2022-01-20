import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { blogsApi } from "../services/blogs";

import { userApi } from "../services/login";
import { authSlice } from "./auth.store";
import { notificationsSlice } from "./notifications.store";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, blogsApi.middleware),
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
