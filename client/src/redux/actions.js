import { SET_LOADING, SET_USER, SET_PARTNER, UPDATE_LIKED_NAMES, UPDATE_SEEN_NAMES, UPDATE_PARTNER_NAMES, FIND_MATCHES, LINK_ACCOUNT, REGISTRATION_SUCCESS } from './actiontypes';
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
  return {
    type: SET_USER,
    payload: userData
  };
};

export const setPartner = user => {
  return dispatch => {
      axios
        .get(`${BASE_URL}/user/${user.data.partnerId}`)
        .then((partner) => {
          console.log(partner);
          dispatch({
            type: SET_PARTNER,
            payload: partner
          });
        })
        .catch(err => {
          toast.error('Something went wrong');
          console.error(err);
        });
  }
};

export const findMatches = () => {
  return {
    type: FIND_MATCHES
  };
};

// TODO why toast notification not working?
export const registerUser = (userData) => {
  return dispatch => {
    axios
      .post(`${BASE_URL}/register`, userData)
      .then((user) => {
        toast.success(`Welcome ${user.data.firstName}`, {
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
          payload: user
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
        console.log(user.data.firstName)
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
          payload: user
        });
      })
      .catch(err => {
        toast.error('Something went wrong');
        console.error(err);
      });
  };
}




