import axios from 'axios';

const BASE_URL = 'http://localhost:4002';

export function getNames(gender, setState, setLoading) {
  return axios
    .get(`${BASE_URL}/names/${gender}`)
    .then(allnames => {
      setState(allnames.data)
      return allnames.data;
    })
    .then((res) => {
      setLoading(false)
      console.log('res', res)
      return res;
    })
    .catch(err => console.error(err))
}

export function seenNames(userId, setState) {
  return axios
    .get(`${BASE_URL}/user/${userId}/seen`)
    .then(res => { console.log('seen', res.data); setState(res.data); return res.data;})
    .catch(err => console.error(err))
}

export function postSeenNames(userId, nameId) {
  return axios
    .post(`${BASE_URL}/user/${userId}/seen/${nameId}`)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .catch(err => console.error(err))
}

export function likedNames(userId, setState) {
  axios
    .get(`${BASE_URL}/user/${userId}/liked`)
    .then(res => {
      console.log('liked', res.data)
      if (res.data && Array.isArray(res.data)) {
        setState(res.data)
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

export function linkPartners (userId, code, setUser, setPartner){
  axios
    .put(`${BASE_URL}/user/${userId}/link`,
      { linkingCode: code })
    .then((res) => {
      setUser(res.data.user2);
      setPartner(res.data.user1)
    })
    .catch(err => console.error(err))
}