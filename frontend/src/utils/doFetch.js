import { ApiError } from './errors'

const doFetch = ({ url, method, token, body }) =>  fetch(
  url,
  {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
)
  .then( response => {
    if (response.ok) {
      return response.text()
    }

    return response.text().then(text => {
      throw text
    })
  })
  .then(text => {
    return  text ? JSON.parse(text): {}
  })
  .catch(textError => {
    const data = textError.message ? JSON.parse(textError.message) : {}
    throw new ApiError(data)
  })

export default doFetch
