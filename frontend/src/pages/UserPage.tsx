import React from "react";
import { useParams } from "react-router-dom";
import { blogsApi } from "../services/blogs";
import { usersApi } from "../services/users";

export const UserPage = (): JSX.Element => {
  const { userId } = useParams();
  const { user } = usersApi.useUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.find((user) => user.id === userId),
    }),
  });
  const { data: blogs } = blogsApi.useGetQuery();

  const getBlog = (blogId: string) => blogs?.find((blog) => blog.id === blogId);

  return user ? (
    <div>
      <h2>User: {user.name}</h2>
      <h3>Blogs:</h3>
      <ul>
        {user.blogs.map(({ id }) => {
          const blog = getBlog(id);
          return (
            <div key={id}>
              <pre>{JSON.stringify(blog, null, 2)}</pre>
            </div>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>User not found</div>
  );
};
