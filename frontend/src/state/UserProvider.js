import React, {
  useContext,
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

import PropTypes from "prop-types";

export const UserContext = new React.createContext();

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useUser used outside provider");
  }

  return userContext;
};

const USER_KEY = "blog-user-data";
function cacheUserInLocalStorage(user) {
  const cachedUser = JSON.stringify(user);
  localStorage.setItem(USER_KEY, cachedUser);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useLayoutEffect(() => {
    const cachedUser = localStorage.getItem(USER_KEY);
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      cacheUserInLocalStorage(user);
    }
  }, [user]);

  const logout = useCallback(() => {
    setUser(undefined), localStorage.removeItem(USER_KEY);
  });

  const value = useMemo(
    () => ({ user, setUser, logout }),
    [user, setUser, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.element,
};
