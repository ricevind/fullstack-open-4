import React, { useState } from "react";
import PropTypes from "prop-types";

import { blogsApi } from "../services/blogs";
import { useNotification } from "../state/notifications.store";

const validateBlogForm = () => true;
const initialEditorState = {
  title: "",
  author: "",
  url: "",
};

const BlogEditor = ({ onCreateSuccess }: any) => {
  const [blogForm, setBlogForm] = useState(initialEditorState);
  const showNotification = useNotification();
  const [createBlog] = blogsApi.useCreateMutation();

  const onChange = (prop: any) => (event: any) => {
    event.preventDefault();
    const value = event.target.value;

    setBlogForm((state) => ({ ...state, [prop]: value }));
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (validateBlogForm()) {
      createBlog({ ...blogForm })
        .unwrap()
        .then((blog) => {
          setBlogForm(initialEditorState);
          onCreateSuccess();
          showNotification({
            message: `${blog.title} has been created`,
            type: "success",
          });
        })
        .catch((error) =>
          showNotification({
            message: `${error.message}`,
            type: "success",
          })
        );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            value={blogForm.title}
            onChange={onChange("title")}
          ></input>
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            name="author"
            value={blogForm.author}
            onChange={onChange("author")}
          ></input>
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            id="url"
            name="url"
            value={blogForm.url}
            onChange={onChange("url")}
          ></input>
        </div>
        <div>
          <button>Create</button>
        </div>
      </form>
    </div>
  );
};

BlogEditor.propTypes = {
  onCreateSuccess: PropTypes.func,
};

export default BlogEditor;
