import axios from 'axios'

import config from '../utils/config'
import doFetch from '../utils/doFetch'

const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}



const createOne = ({ title, author, url, token }) =>
  doFetch({
    url: `${config.API_HOST}/api/blogs`,
    method: 'POST',
    token,
    body: { title, author, url }
  })


const patchOne = ({ blogId, update, token }) =>
  doFetch({
    url: `${config.API_HOST}/api/blogs/${blogId}`,
    method: 'PATCH',
    token,
    body: update
  })


const deleteOne = ({ blogId, token }) =>
  doFetch({
    url: `${config.API_HOST}/api/blogs/${blogId}`,
    method: 'DELETE',
    token,
  })



export default {
  getAll,
  createOne,
  patchOne,
  deleteOne
}