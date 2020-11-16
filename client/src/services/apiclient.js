import axios from 'axios';

const BASE_URL = 'http://localhost:4002';

export function getNames(gender, setState, setLoading) {
  axios
    .get(`${BASE_URL}/names/${gender}`)
    .then(allnames => setState(allnames.data))
    .then(setLoading(false))
    .catch(err => console.error(err))
}

export function seenNames(userId, setState) {
  axios
    .get(`${BASE_URL}/user/${userId}/seen`)
    .then(res => setState(res.data))
    .catch(err => console.error(err))
}

export function postSeenNames(userId, nameId) {
  axios
    .post(`${BASE_URL}/user/${userId}/seen/${nameId}`)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .catch(err => console.error(err))
}

export function likedNames(userId, setState) {
  axios
    .get(`${BASE_URL}/user/${userId}/liked`)
    .then(res => {
      if (res.data && Array.isArray(res.data)) {
        setState(res.data)
        console.log(res.data)
      }
    })
    .catch(err => console.error(err));
}

export function postLikedNames(userId, nameId) {
  axios
    .post(`${BASE_URL}/user/${userId}/liked/${nameId}`)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .catch(err => console.error(err))
}

export function deleteName(userId, nameId) {
  axios
    .delete(`${BASE_URL}/user/${userId}/liked/${nameId}`)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .catch(err => console.error(err))
}