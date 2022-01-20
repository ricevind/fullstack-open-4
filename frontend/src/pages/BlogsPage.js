import React, { useRef, useState } from "react";
import { blogsApi } from "../services/blogs";
import Blog from "../components/Blog";
import Togglable from "../components/Togglable";
import BlogEditor from "../components/BlogEditor";
import { useNotification } from "../state/notifications.store";

const sortBlogsByLikes = (blogs) => {
  const copy = [...blogs];
  copy.sort((a, b) => b.likes - a.likes);
  return copy;
};

const BlogsPage = () => {
  const [areSortByLikes, setAreSortByLikes] = useState(false);
  const editorToggleRef = useRef();

  const { data: blogs, isSuccess } = blogsApi.useGetQuery();

  const sortedBlogs = areSortByLikes ? sortBlogsByLikes(blogs) : blogs;

  const [updateOne] = blogsApi.useUpdateMutation();
  const [deleteOne] = blogsApi.useDeleteMutation();

  const showNotification = useNotification();

  const onCreateSuccess = () => {
    editorToggleRef.current.close();
  };

  const likeOne = (blog) => {
    updateOne({
      likes: blog.likes + 1,
      id: blog.id,
    })
      .unwrap()
      .then((blog) => {
        showNotification({
          message: `Blog ${blog.title} likes increased`,
          type: "success",
        });
      })
      .catch((error) => showNotification(error.message));
  };

  const deleteOneWithNotification = (blog) => {
    deleteOne({
      id: blog.id,
    })
      .unwrap()
      .then(() => {
        showNotification({
          message: `Blog ${blog.title} was deleted`,
          type: "success",
        });
      })
      .catch((error) => showNotification(error.message));
  };

  const sortByLikes = () => {
    setAreSortByLikes((prev) => !prev);
  };

  if (isSuccess) {
    return (
      <div>
        <h2>
          blogs
          <button onClick={sortByLikes}>Sort by likes</button>
        </h2>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeOne={likeOne}
            deleteOne={deleteOneWithNotification}
          />
        ))}

        <h2>create new</h2>
        <Togglable action="Add blog" ref={editorToggleRef}>
          <BlogEditor onCreateSuccess={onCreateSuccess}></BlogEditor>
        </Togglable>
      </div>
    );
  }

  return <div>Loading</div>;
};

export default BlogsPage;
