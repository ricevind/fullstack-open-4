import React from "react";
import BlogsPage from "./pages/BlogsPage";
import Login from "./components/Login";
import { useInitUser, useLogout, useAuthState } from "./state/UserProvider";
import { NotificationProvider } from "./state/NotificationProvider";
import { Provider } from "react-redux";

import Notification from "./components/Notification";
import { store } from "./state/store";

const App = () => {
  useInitUser();
  const user = useAuthState();
  const logout = useLogout();

  return (
    <div>
      <Notification></Notification>
      {
        // eslint-disable-next-line eqeqeq
        user == null ? (
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
    <NotificationProvider>
      <App></App>
    </NotificationProvider>
  </Provider>
);

export default AppWithProviders;
