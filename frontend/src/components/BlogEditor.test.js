import React from 'react'
import {  fireEvent, waitFor, } from '@testing-library/react'
import BlogEditor from './BlogEditor'
import { createRendererWithProviders } from '../utils/test/notification-provider.test-util'
import { UserContext } from '../state/UserProvider'
import { NotificationContext } from '../state/NotificationProvider'
import blogsService from '../services/blogs'

jest.mock('../services/blogs')

afterEach(() => {
  jest.resetAllMocks()
})

describe('BlogEditor', () => {
  let blogEditorComponent
  let onCreateSuccessFn

  const render = createRendererWithProviders([
    [NotificationContext.Provider, { value: { setErrorNotification: () => {} } }],
    [UserContext.Provider, { value: { user: { token: 'test-token' } } }],
  ])

  beforeEach(() => {
    onCreateSuccessFn = jest.fn()
    blogEditorComponent = render(<BlogEditor onCreateSuccess={onCreateSuccessFn}></BlogEditor>)

  })


  test('exists', () => {
    expect(blogEditorComponent.container).toBeTruthy()
  })

  test('creates blog with proper values', async() => {
    const titleInput = blogEditorComponent.getByLabelText(/title/i)
    const authorInput = blogEditorComponent.getByLabelText(/author/i)
    const urlInput = blogEditorComponent.getByLabelText(/url/i)

    fireEvent.change(titleInput, { target: { value:  'test-title' } })
    fireEvent.change(authorInput, { target: { value:  'test-author' } })
    fireEvent.change(urlInput, { target: { value:  'test-url' } })

    const submitButton = blogEditorComponent.getByRole('button')

    blogsService.createOne.mockResolvedValueOnce({ title: 'foo' })

    fireEvent.click(submitButton)


    await waitFor(() => expect(onCreateSuccessFn).toBeCalledTimes(1))
    await waitFor(() => expect(blogsService.createOne).toHaveBeenCalledWith({
      'author': 'test-author',
      'title': 'test-title',
      'token': 'test-token',
      'url': 'test-url',
    }))
  })
})