/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, likeOne, deleteOne }: any) => {
  const [showDetails, setShowDetails] = useState(false);

  const deleteFn = () => {
    const shouldDelete = window.confirm(`should delete ${blog.title}`);
    if (shouldDelete) {
      deleteOne(blog);
    }
  };

  const detailsButtonLabel = showDetails ? "Hide details" : "Show details";
  const toggleDetails = () => {
    setShowDetails((showDetails) => !showDetails);
  };

  const toggleDetailsButton = (
    <button
      id="toggleBlogDetails"
      aria-live="polite"
      aria-controls="blogDetails"
      onClick={toggleDetails}
    >
      {detailsButtonLabel}
    </button>
  );

  return (
    <div role="region" aria-label="blog info">
      <p aria-label="blog author">{blog.author}</p>
      <p aria-label="blog title">{blog.title}</p>
      {toggleDetailsButton}

      <div
        aria-labelledby="toggleBlogDetails"
        aria-expanded={showDetails}
        id="blogDetails"
      >
        {showDetails && (
          <>
            <p>
              Title :{" "}
              <span aria-label="blog name">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </span>
            </p>
            <p>
              likes : <span aria-label="blog likes">{blog.likes}</span>
            </p>
            <p>
              url : <a href={blog.url}>Blog URL</a>
            </p>
            <button aria-label="delete blog" onClick={deleteFn}>
              Delete
            </button>
            <button aria-label="like blog" onClick={() => likeOne(blog)}>
              Like
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
