import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import Notification from "../components/Notification";
import { useDispatch } from "react-redux";

type Notification = {
  id: string;
  message: string;
  type: "success" | "failure" | "info";
};
type NotificationsState = { items: Notification[] };
const initialState: NotificationsState = { items: [] };

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    notify: (state, action: PayloadAction<Notification>) => {
      state.items.push(action.payload);
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      const indexToDelete = state.items.findIndex(
        (notification) => notification.id === action.payload
      );
      if (indexToDelete > -1) {
        state.items.splice(indexToDelete, 1);
      }
    },
  },
});

type DisplayNotificationWithDurationPayload = Omit<Notification, "id"> & {
  duration?: number;
};

export const createDisplayNotification = createAsyncThunk(
  "notifications/displayNotification",
  (config: DisplayNotificationWithDurationPayload, thunkApi) => {
    const id = "" + Math.random();
    const notifyAction = notificationsSlice.actions.notify({ ...config, id });
    thunkApi.dispatch(notifyAction);

    return new Promise<void>((resolve) => {
      const clearNotification =
        notificationsSlice.actions.clearNotification(id);
      setTimeout(() => {
        thunkApi.dispatch(clearNotification);
        resolve();
      }, config.duration);
    });
  }
);

export const selectNotifications = (state: AppState): Notification[] =>
  state.notifications.items;

export const useNotification = (): ((
  config: DisplayNotificationWithDurationPayload
) => void) => {
  const dispatch = useDispatch();

  return (config) => {
    if (!config.duration) {
      config.duration = 5000;
    }

    const showNotificationThunk = createDisplayNotification(config);

    dispatch(showNotificationThunk);
  };
};
