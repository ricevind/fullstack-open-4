import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { blogsApi, commentsApi } from "../services/blogs";

export const BlogPage = (): JSX.Element => {
  const { blogId } = useParams();
  const { blog } = blogsApi.useGetQuery(undefined, {
    selectFromResult: ({ data }) => ({
      blog: data?.find((blog) => blog.id === blogId),
    }),
  });
  const { data: comments } = commentsApi.useCommentsQuery(blogId ?? skipToken);
  const [addComment] = commentsApi.useAddCommentMutation();
  const [comment, setComment] = useState("");

  const onAddComment = () => {
    if (!blogId) {
      return;
    }
    addComment({ content: comment, blogId })
      .unwrap()
      .then(() => setComment(""));
  };

  return blog ? (
    <div>
      <pre>{JSON.stringify(blog, null, 2)}</pre>
      <pre>{JSON.stringify(comments, null, 2)}</pre>
      <div>
        <label>
          Add comment:
          <input
            value={comment}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setComment(event.currentTarget.value)
            }
          ></input>
        </label>
        <button onClick={onAddComment}>Add comment</button>
      </div>
    </div>
  ) : (
    <></>
  );
};
