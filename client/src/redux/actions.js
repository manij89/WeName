import { 
  SET_LOADING, 
  SET_USER, 
  SET_PARTNER, 
  SET_MATCHES, 
  GET_LIKED_NAMES, 
  GET_PARTNER_NAMES } from './actiontypes';
import axios from 'axios';

// export const BASE_URL = 'http://localhost:4002';
export const BASE_URL = 'https://we-name.herokuapp.com';
// export const BASE_URL = window.location.origin;

export const setLoading = (status) => {
  return {
    type: SET_LOADING,
    payload: status
  }
}

export const setUser = userData => {
  return {
    type: SET_USER,
    payload: userData
  };
};

export const setLikes = (likedNames) => {
  return {
    type: GET_LIKED_NAMES,
    payload: likedNames
  };
}

export const linkPartner = partner => {
  return {
    type: SET_PARTNER,
    payload: partner
  };
};

export const getUser = user => {
    return dispatch => {
      axios
        .get(`${BASE_URL}/user/${user.id}`)
        .then((user) => {
          dispatch({
            type: SET_USER,
            payload: user.data
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

export const setPartner = user => {
  return dispatch => {
    axios
      .get(`${BASE_URL}/user/${user.partnerId}`)
      .then((partner) => {
        dispatch({
          type: SET_PARTNER,
          payload: partner.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
};


// TODO add snackbar notification ('welcome user.name')
export const registerUser = (userData) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/register`, userData)
      .then((user) => {
        dispatch({
          type: SET_USER,
          payload: user.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}

// TODO add snackbar notification ('welcome back user.name')
export const loginUser = (userData) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/login`, userData)
      .then((user) => {
        dispatch({
          type: SET_USER,
          payload: user.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}


export const getLikedNames = (userId) => {
  return dispatch => {
    axios
      .get(`${BASE_URL}/user/${userId}/liked`)
      .then((liked) => {
        dispatch({
          type: GET_LIKED_NAMES,
          payload: liked.data
        })
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export const getPartnerLikedNames = (partnerId) => {
  return dispatch => {  
     axios
      .get(`${BASE_URL}/user/${partnerId}/liked`)
      .then((liked) => {
        dispatch({
          type: GET_PARTNER_NAMES,
          payload: liked.data
        })
      })
      .catch(err => {
        console.error(err, 'e');
      });
  }
}

export const setMatches = (newMatches) => {
  return {
    type: SET_MATCHES,
    payload: newMatches
  };
};







