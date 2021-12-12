import React, { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import BlogEditor from '../components/BlogEditor'
import { useUser } from '../state/UserProvider'
import { useNotification } from '../state/NotificationProvider'

const sortBlogsByLikes = (blogs) => {
  return  [... blogs.sort((a, b) => a.likes - b.likes)]
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([])
  const editorToggleRef = useRef()
  const areSortByLikes = useRef(false)
  const { user: { token } } = useUser()
  const {
    setSuccessNotification,
    setErrorNotification
  } = useNotification()

  useEffect(() => {
    refreshBlogs()
  }, [])

  const refreshBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( areSortByLikes.current ? sortBlogsByLikes : blogs )
    )
  }

  const onCreateSuccess = () => {
    editorToggleRef.current.close()
    refreshBlogs()
  }

  const likeOne = (blog) => {
    blogService.patchOne({
      blogId: blog.id,
      update: {
        likes: blog.likes + 1
      },
      token
    }).then(blog => {
      setBlogs(blogs => {
        return blogs.map(cachedBlog => cachedBlog.id === blog.id ? blog : cachedBlog)
      })
      setSuccessNotification(`Blog ${blog.title} likes increased`)
    }).catch(error => setErrorNotification(error.message))
  }

  const deleteOne = (blog) => {
    blogService.deleteOne({
      blogId: blog.id,
      token
    }).then(() => {
      setBlogs(blogs => {
        return blogs.filter(cachedBlog => cachedBlog.id !== blog.id )
      })
      setSuccessNotification(`Blog ${blog.title} was deleted`)
    }).catch(error => setErrorNotification(error.message))
  }

  const sortByLikes = () => {
    setBlogs(sortBlogsByLikes)
    areSortByLikes.current = true
  }

  return <div>
    <h2>blogs
      <button onClick={sortByLikes}>Sort by likes</button>
    </h2>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        likeOne={likeOne}
        deleteOne={deleteOne}
      />
    )}

    <h2>create new</h2>
    <Togglable
      action="Add blog"
      ref={editorToggleRef}
    >
      <BlogEditor onCreateSuccess={onCreateSuccess}></BlogEditor>
    </Togglable>
  </div>
}

export default BlogsPage