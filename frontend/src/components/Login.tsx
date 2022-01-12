import React, {
  EventHandler,
  FormEvent,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { useLogin } from "../state/UserProvider";
import { useNotification } from "../state/NotificationProvider";
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { Credentials } from "../models/user";

const initialState = {
  username: "",
  password: "",
  status: "idle",
  error: undefined,
};

type LoginState = {
  username: string;
  password: string;
  status: string;
  error?: string;
};

const loginReducer: Reducer<
  LoginState,
  {
    type: string;
    params: Partial<Credentials & { status: string; error: string }>;
  }
> = (state, action) => {
  const { type, params } = action;

  switch (type) {
    case "setUsername":
      return { ...state, username: params.username! };
    case "setPassword":
      return { ...state, password: params.password! };
    case "setCredentials":
      return {
        ...state,
        password: params.password!,
        username: params.username!,
      };
    case "setStatus":
      return { ...state, status: params.status! };
    case "setError":
      return { ...state, status: "error", error: params.error! };
    default:
      throw new Error("unknown action fro login reducer");
  }
};

const useLoginCmpLogic = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const loginApi = useLogin();
  const login = useCallback(() => {
    dispatch({
      type: "setStatus",
      params: { status: "loading" },
    });
    return loginApi(state)
      .then((data) => {
        dispatch({
          type: "setStatus",
          params: { status: "loaded" },
        });
        dispatch({
          type: "setCredentials",
          params: { username: "", password: "" },
        });

        return data;
      })
      .catch((error) => {
        dispatch({
          type: "setError",
          params: { error },
        });
        throw error;
      });
  }, []);

  useEffect(() => {
    let timeoutId: TimeoutId;
    if (state.status === "error" || state.status === "loaded") {
      timeoutId = setTimeout(
        () =>
          dispatch({
            type: "setStatus",
            params: { status: "idle" },
          }),
        3000
      );
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [state.status]);

  return { state, dispatch, login };
};

const Login = () => {
  const { state, dispatch, login } = useLoginCmpLogic();
  const { setSuccessNotification, setErrorNotification } = useNotification();

  const onUsernameChange = (event: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "setUsername",
      params: {
        username: event.currentTarget.value,
      },
    });
  };

  const onPasswordChange = (event: FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-debugger
    debugger;
    dispatch({
      type: "setPassword",
      params: {
        password: event.currentTarget.value,
      },
    });
  };

  const onLogin = (event: FormEvent) => {
    event.preventDefault();
    if (state.status === "idle") {
      login()
        .then((user) => {
          setSuccessNotification(`${user.name} has logged in`);
        })
        .catch((error) => setErrorNotification(`${error.message}`));
    }
  };

  return (
    <form onSubmit={onLogin}>
      <h1>{state.status}</h1>
      <div className="form-element">
        <label htmlFor="username">UserName:</label>
        <input
          id="username"
          name="username"
          value={state.username}
          onChange={onUsernameChange}
        ></input>
      </div>
      <div className="form-element">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          value={state.password}
          onChange={onPasswordChange}
        ></input>
      </div>
      <button type="submit">
        {state.status === "idle" ? "Login" : "Wait"}
      </button>
    </form>
  );
};

export default Login;
