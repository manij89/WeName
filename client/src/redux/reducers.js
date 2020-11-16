/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import {
  SET_USER,
  SET_PARTNER,
  UPDATE_LIKED_NAMES,
  UPDATE_PARTNER_NAMES,
  SET_MATCHES,
  LINK_ACCOUNT,
  REGISTRATION_SUCCESS,
  SET_LOADING,
  GET_LIKED_NAMES,
  GET_PARTNER_NAMES
} from './actiontypes';

const initialState = {
  isAuthenticated: false,
  registration_success: false,
  loading: true,
  user: {},
  partner: {},
  likedNames: [],
  partnerLikedNames: [],
  matches: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registration_success: true,
        loading: false
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_PARTNER:
      return {
        ...state,
        partner: action.payload,
      };

    case UPDATE_PARTNER_NAMES: 
      const newName = action.payload;
      return {
        ...state,
        partnerLikedNames: [...state.partnerLikedNames, newName]
      };

    case GET_LIKED_NAMES:
      return {
        ...state,
        likedNames:action.payload
      };

    case GET_PARTNER_NAMES:
      return {
        ...state,
        partnerLikedNames: action.payload
      };

    case SET_MATCHES:
      return {
        ...state,
        matches: action.payload
      };

    case LINK_ACCOUNT:
      const copyUser1 = Object.assign(state.user);
      const copyPartner = Object.assign(state.partner);
      copyUser1.data.linkingCode = action.payload.id;
      copyPartner.data.linkingCode = action.payload.id
      return {
        ...state,
        loading: false,
        user: copyUser1,
        partner: copyPartner
      };
    default:
      return state;

  }
}

export default reducer;