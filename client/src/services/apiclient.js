/* eslint-disable import/no-anonymous-default-export */

const BASE_URL = 'http://localhost:4002';

const fetchRequest = (url, options) => {
  return fetch(`${BASE_URL}/${url}`, options)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => console.error(`${err.message} while fetching /${url}`))
};

export default {

  getNames: (gender) => {
    return fetchRequest(`/names/${gender}`)
  }
}

