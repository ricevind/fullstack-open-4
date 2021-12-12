/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const Blog = ({ blog, likeOne, deleteOne }) => {
  const [showDetails, setShowDetails] = useState(false)

  const deleteFn = () => {
    const shouldDelete = window.confirm(`should delete ${blog.title}`)
    if (shouldDelete) {
      deleteOne(blog)
    }
  }

  return showDetails ?
    <div>
      <p>
        {blog.title}
        <button onClick={() => setShowDetails(false)}>Hide details</button>
      </p>
      <p>{blog.author}</p>
      <p>likes : {blog.likes} <button onClick={() => likeOne(blog)}>Like</button></p>
      <div>
        <button onClick={deleteFn}>Delete</button>
      </div>


    </div>
    :
    <div>
      <p>
        {blog.title}
        <button onClick={() => setShowDetails(true)}>Show details</button>
      </p>
    </div>

}

export default Blog