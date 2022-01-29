import React from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { useLogout, useAuthState } from "../state/auth.store";

const NavigationLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <>
      <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </>
  );
};

export const Navigation = (): JSX.Element => {
  const logout = useLogout();
  const { user } = useAuthState();

  return (
    <header style={{ display: "flex" }}>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            <NavigationLink to="blogs">Blogs</NavigationLink>
          </li>
          <li>
            <NavigationLink to="users">Users</NavigationLink>
          </li>
        </ul>
      </nav>
      <div>
        <span>{user?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};
