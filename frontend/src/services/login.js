import config from '../utils/config'
import { ApiError } from '../utils/errors'

const login = ({ username, password }) =>
  fetch(`${config.API_HOST}/api/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return response.json().then((data) => {
      throw new ApiError(data);
    });
  });

const service = { login };

export default service;

