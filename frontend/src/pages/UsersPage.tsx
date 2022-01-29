import React from "react";
import { usersApi } from "../services/users";
import { Link } from "react-router-dom";

export const UsersPage = (): JSX.Element => {
  const { data = [] } = usersApi.useUsersQuery();

  return (
    <div>
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
                <td>
                  {" "}
                  <Link to={`/users/${user?.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
