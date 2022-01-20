import React, { FormEvent, useEffect, useState } from "react";
import { useLogin } from "../state/auth.store";
import { useNotification } from "../state/notifications.store";
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";

const useLoginCmpLogic = () => {
  const [loginFormState, setLoginFormState] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [login, loginStatus] = useLogin();

  useEffect(() => {
    let timeoutId: TimeoutId;
    if (loginStatus.isError || loginStatus.isSuccess) {
      timeoutId = setTimeout(() => loginStatus.reset(), 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loginStatus.status]);

  return { login, loginFormState, loginStatus, setLoginFormState };
};

const Login = (): JSX.Element => {
  const { loginFormState, loginStatus, login, setLoginFormState } =
    useLoginCmpLogic();
  const showNotification = useNotification();

  const onUsernameChange = (event: FormEvent<HTMLInputElement>) => {
    const username = event.currentTarget.value;
    setLoginFormState((currState) => ({
      ...currState,
      username,
    }));
  };

  const onPasswordChange = (event: FormEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    setLoginFormState((currState) => ({
      ...currState,
      password,
    }));
  };

  const onLogin = (event: FormEvent) => {
    event.preventDefault();
    if (loginStatus.isUninitialized) {
      login(loginFormState)
        .then((user) => {
          showNotification({
            message: `${user.name} has logged in`,
            type: "success",
          });
        })
        .catch((error) =>
          showNotification({
            message: `${error.message}`,
            type: "failure",
          })
        );
    }
  };

  return (
    <form onSubmit={onLogin}>
      <h1>{loginStatus.status}</h1>
      <div className="form-element">
        <label htmlFor="username">UserName:</label>
        <input
          id="username"
          name="username"
          value={loginFormState.username}
          onChange={onUsernameChange}
        ></input>
      </div>
      <div className="form-element">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          value={loginFormState.password}
          onChange={onPasswordChange}
        ></input>
      </div>
      <button type="submit">
        {loginStatus.isUninitialized ? "Login" : "Wait"}
      </button>
    </form>
  );
};

export default Login;
