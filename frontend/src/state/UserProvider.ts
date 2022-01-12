import { useLayoutEffect } from "react";
import { useLoginMutation, userApi } from "../services/login";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { Credentials, User } from "../models/user";
import { AppState } from "./store";

export const useAuthState = () => {
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
  }, []);
};
console.log(useLoginMutation);

export const useLogin = () => {
  const [login] = useLoginMutation();

  const loginWrapper = (credentials: Credentials) => {
    return login(credentials)
      .unwrap()
      .then((user) => {
        if (user) {
          cacheUserInLocalStorage(user);
        }

        return user;
      });
  };

  return loginWrapper;
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(
      authSlice.actions.setUserAndToken({
        user: null,
        token: null,
      })
    );
    localStorage.removeItem(USER_KEY);
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

console.log(userApi.endpoints);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUserAndToken: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      state.token = token;
      state.user = user;
    },
  },
});

export const selectUser = (state: AppState) => state.auth.user;
export const selectToken = (state: AppState) => state.auth.token;
