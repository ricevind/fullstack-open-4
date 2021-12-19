import React from 'react'

import { render ,fireEvent, within } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'test-title',
    author: 'test-author',
    url: 'test-url',
    likes: 54
  }

  let blogComponent

  beforeEach(() => {
    blogComponent = render(
      <Blog blog={blog}></Blog>
    )

  })

  test('it renders content', () => {
    expect(blogComponent.container).toHaveTextContent(blog.title)
    expect(blogComponent.container).toHaveTextContent(blog.author)
  })

  test('it does not render collapsed content', () => {
    expect(blogComponent.container).not.toHaveTextContent(blog.url)
    expect(blogComponent.container).not.toHaveTextContent(blog.likes)
  })

  describe('Behavior: toggling content', () => {

    test('When: details button is clicked, it renders additional content', () => {
      clickDetailsButton()

      const urlAnchorElement = within(blogComponent.container).getByRole('link')

      expect(urlAnchorElement).toHaveAttribute('href', blog.url)
      expect(blogComponent.container).toHaveTextContent(blog.likes)
    })

    test('When: details button is clicked twice, it does not render additional content', () => {
      clickDetailsButton()
      clickDetailsButton()

      const urlAnchorElement = within(blogComponent.container).queryByRole('link')

      expect(urlAnchorElement).toBe(null)
      expect(blogComponent.container).not.toHaveTextContent(blog.likes)
    })
  })

  describe('Behavior: liking blog', () => {
    let likeFn

    beforeEach(() => {
      likeFn = jest.fn()
      blogComponent.rerender(<Blog blog={blog} likeOne={likeFn}></Blog>)
    })

    test('clicking like twice calls like handler two times', () => {
      clickDetailsButton()
      clickLikeButton()
      clickLikeButton()

      expect(likeFn).toHaveBeenCalledTimes(2)
    })

  })

  function clickDetailsButton() {
    const detailsButton = blogComponent.getByRole('button', { name: /details/i } )
    fireEvent.click(detailsButton)
  }

  function clickLikeButton() {
    const likeButton = blogComponent.getByRole('button', { name: /like/i } )
    fireEvent.click(likeButton)
  }
})