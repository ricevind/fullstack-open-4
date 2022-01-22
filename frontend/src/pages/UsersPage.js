import React from "react";
import { useAuthState, useLogout } from "../state/auth.store";
import { usersApi } from "../services/users";

export const UsersPage = () => {
  const logout = useLogout();
  const { user } = useAuthState();
  const { data = [] } = usersApi.useUsersQuery();

  return (
    <div>
      <div>
        <p>User logged in</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
