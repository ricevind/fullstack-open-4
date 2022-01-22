import React, { useEffect, ReactNode } from "react";
import BlogsPage from "./pages/BlogsPage";
import Login from "./components/Login";
import { useAuthState, useInitUser } from "./state/auth.store";
import { Provider } from "react-redux";

import Notification from "./components/Notification";
import { store } from "./state/store";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";

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
      <>
        <nav>
          <ul>
            <li>
              <Link to="blogs">Blogs</Link>
            </li>
            <li>
              <Link to="users">Users</Link>
            </li>
          </ul>
        </nav>
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
          <Route path="*" element={<Navigate to="blogs" />} />
        </Routes>
      </>
    </div>
  ) : null;
};

const AppWithProviders = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>
);

export default AppWithProviders;
