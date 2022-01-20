import React from "react";
import BlogsPage from "./pages/BlogsPage";
import Login from "./components/Login";
import { useLogout, useAuthState } from "./state/auth.store";
import { Provider } from "react-redux";

import Notification from "./components/Notification";
import { store } from "./state/store";

const App = () => {
  const user = useAuthState();
  const logout = useLogout();

  return (
    <div>
      <Notification></Notification>
      {
        // eslint-disable-next-line eqeqeq
        user.user == null ? (
          <div>
            <Login></Login>
          </div>
        ) : (
          <>
            <BlogsPage></BlogsPage>
            <button onClick={logout}>Logout</button>
          </>
        )
      }
    </div>
  );
};

const AppWithProviders = () => (
  <Provider store={store}>
    <App></App>
  </Provider>
);

export default AppWithProviders;
