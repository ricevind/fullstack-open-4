import React, { useEffect, ReactNode } from "react";
import BlogsPage from "./pages/BlogsPage";
import Login from "./components/Login";
import { useAuthState, useInitUser } from "./state/auth.store";
import { Provider } from "react-redux";

import Notification from "./components/Notification";
import { store } from "./state/store";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";
import { UserPage } from "./pages/UserPage";
import { BlogPage } from "./pages/BlogPage";
import { Navigation } from "./components/Navigation";

const RequiredRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      console.log(user);
      console.log("login!!");
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [user]);

  return user ? <>{children}</> : null;
};

const App = () => {
  const done = useInitUser();

  return done ? (
    <div>
      <Notification></Notification>
      <Navigation></Navigation>
      <Routes>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="blogs" element={<BlogsPage></BlogsPage>}></Route>
        <Route
          path="users"
          element={
            <RequiredRoute>
              <UsersPage></UsersPage>
            </RequiredRoute>
          }
        ></Route>
        <Route
          path="users/:userId"
          element={
            <RequiredRoute>
              <UserPage></UserPage>
            </RequiredRoute>
          }
        ></Route>
        <Route
          path="blogs/:blogId"
          element={
            <RequiredRoute>
              <BlogPage></BlogPage>
            </RequiredRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="blogs" />} />
      </Routes>
    </div>
  ) : (
    <></>
  );
};

const AppWithProviders = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>
);

export default AppWithProviders;
