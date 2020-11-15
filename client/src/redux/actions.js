import { 
  SET_LOADING, 
  SET_USER, 
  SET_PARTNER, 
  UPDATE_LIKED_NAMES, 
  UPDATE_PARTNER_NAMES, 
  SET_MATCHES, 
  LINK_ACCOUNT, 
  REGISTRATION_SUCCESS, 
  GET_LIKED_NAMES, 
  GET_PARTNER_NAMES } from './actiontypes';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:4002';

export const setLoading = (status) => {
  return {
    type: SET_LOADING,
    payload: status
  }
}

export const setUser = userData => {
  console.log('user' , userData)
  return {
    type: SET_USER,
    payload: userData
  };
};

export const linkPartner = partner => {
  console.log('partner', partner)
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
          toast.error('Something went wrong');
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
        toast.error('Something went wrong');
        console.error(err);
      });
  }
};


// TODO why toast notification not working?
export const registerUser = (userData) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/register`, userData)
      .then((user) => {console.log(user.data)
        // toast.success(`Welcome ${user.data.firstName}`, {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        dispatch({
          type: SET_USER,
          payload: user.data
        });
      })
      .catch(err => {
        toast.error('Something went wrong');
        console.error(err);
      });
  };
}

export const loginUser = (userData) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/login`, userData)
      .then((user) => {
        toast.success(`Welcome Back ${user.data.firstName}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: SET_USER,
          payload: user.data
        });
      })
      .catch(err => {
        toast.error('Something went wrong');
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
        toast.error('Something went wrong');
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
        toast.error('Something went wrong');
        console.error(err, 'e');
      });
  }
}

export const setMatches = (matches) => {
  return {
    type: SET_MATCHES,
    payload: matches
  };
};







