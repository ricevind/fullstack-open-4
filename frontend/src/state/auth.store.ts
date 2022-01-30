import { useLayoutEffect, useState } from "react";
import { useLoginMutation, userApi } from "../services/login";
import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { Credentials, User } from "../models/user";
import { AppState } from "./store";
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/dist/query";

export const useAuthState = (): AuthState => {
  const auth = useSelector((state: AppState) => state.auth);

  return auth;
};

const USER_KEY = "blog-user-data";
function cacheUserInLocalStorage(user: User) {
  const cachedUser = JSON.stringify(user);
  localStorage.setItem(USER_KEY, cachedUser);
}

function retrieveCachedUser(): User | undefined {
  const serializedUser = localStorage.getItem(USER_KEY);
  return serializedUser && JSON.parse(serializedUser);
}

export const useInitUser = () => {
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const cachedUser = retrieveCachedUser();
    if (cachedUser) {
      dispatch(
        authSlice.actions.setUserAndToken({
          user: cachedUser,
          token: cachedUser.token,
        })
      );
    }
    setDone(true);
  }, []);

  return done;
};

export const useLogin = (
  callback?: () => void
): [
  (credentials: Credentials) => Promise<User>,
  {
    error?: FetchBaseQueryError | SerializedError;
    status: QueryStatus;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    isUninitialized: boolean;
    reset: () => void;
  }
] => {
  const [login, loginState] = useLoginMutation();
  const loginWrapper = (credentials: Credentials) => {
    return login(credentials)
      .unwrap()
      .then((user) => {
        if (user) {
          cacheUserInLocalStorage(user);
          callback && callback();
        }

        return user;
      });
  };

  return [loginWrapper, loginState];
};

export const useLogout = (callback?: () => void): (() => void) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "app/logout" });
    localStorage.removeItem(USER_KEY);
    callback && callback();
  };
  return logout;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

type AuthState = {
  user: User | null;
  token: string | null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUserAndToken: (
      state,
      { payload: { user, token } }: PayloadAction<AuthState>
    ) => {
      state.token = token;
      state.user = user;
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const user = action.payload;
        console.log({ user });
        state.token = user.token;
        state.user = user;
      }
    ),
});

export const selectUser = (state: AppState): User | null => state.auth.user;
export const selectToken = (state: AppState): string | null => state.auth.token;
