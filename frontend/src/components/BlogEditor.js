import React, { useState } from 'react'
import PropTypes from 'prop-types'

import blogsService from '../services/blogs'
import { useUser } from '../state/UserProvider'
import { useNotification } from '../state/NotificationProvider'

const validateBlogForm = () => true
const initialEditorState = {
  title: '',
  author: '',
  url: ''
}

const BlogEditor = ({ onCreateSuccess }) => {
  const [blogForm, setBlogForm] = useState(initialEditorState)
  const { user } = useUser()
  const { setSuccessNotification, setErrorNotification } = useNotification()


  const onChange = (prop) => (event) => {
    event.preventDefault()
    const value = event.target.value

    setBlogForm((state) => ({ ...state, [prop]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (validateBlogForm(blogForm)) {
      blogsService.createOne({ ...blogForm, token: user.token })
        .then((blog) => {
          setBlogForm(initialEditorState)
          onCreateSuccess()
          setSuccessNotification(`${blog.title} has been created`)
        })
        .catch(error => setErrorNotification(`${error.message}`))
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            value={blogForm.title}
            onChange={onChange('title')}
          ></input>
        </div>
        <div>
          <label htmlFor='author'>Author:</label>
          <input
            id='author'
            name='author'
            value={blogForm.author}
            onChange={onChange('author')}
          ></input>
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input
            id='url'
            name='url'
            value={blogForm.url}
            onChange={onChange('url')}
          ></input>
        </div>
        <div>
          <button>Create</button>
        </div>
      </form>
    </div>
  )
}

BlogEditor.propTypes = {
  onCreateSuccess: PropTypes.func
}

export default BlogEditor
