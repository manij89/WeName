/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import {
  SET_USER,
  SET_PARTNER,
  UPDATE_LIKED_NAMES,
  UPDATE_SEEN_NAMES,
  UPDATE_PARTNER_NAMES,
  FIND_MATCHES,
  LINK_ACCOUNT,
  REGISTRATION_SUCCESS,
  SET_LOADING,
  GET_LIKED_NAMES,
  GET_SEEN_NAMES,
  GET_PARTNER_NAMES
} from './actiontypes';

const initialState = {
  isAuthenticated: false,
  registration_success: false,
  loading: true,
  user: {},
  partner: {},
  seenNames: [],
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

    case UPDATE_LIKED_NAMES: {
      const newName = action.payload;
      const copy = [...state.likedNames, newName];
      return {
        ...state,
        likedNames: copy
      }
    };

    case UPDATE_PARTNER_NAMES: {
      const newName = action.payload;
      const copy = [...state.partnerLikedNames, newName];
      return {
        ...state,
        partnerLikedNames: copy
      }
    };

    case UPDATE_SEEN_NAMES: {
      const newName = action.payload;
      console.log('new seen name', newName)
      const copy = Object.assign(state.seenNames);
      copy.data = [...state.seenNames.data, newName];
      return {
        ...state,
        seenNames: copy
      }
    };

    case GET_SEEN_NAMES: {
      const copy = action.payload;
      return {
        ...state,
        seenNames: copy
      }
    };

    case GET_LIKED_NAMES: {
      const copy = action.payload;
      return {
        ...state,
        likedNames: copy
      }
    };

    case GET_PARTNER_NAMES: {
      const copy = action.payload;
      return {
        ...state,
        partnerLikedNames: copy
      }
    };

    case FIND_MATCHES: {
      const myNames = state.likedNames;
      const partner = state.partnerLikedNames;
     if(myNames.length && partner.length) {
         myNames.filter((name) => (partner.indexOf(name) !== -1))
      }
      return {
        ...state,
        matches: myNames
      }
    };

    case LINK_ACCOUNT: {
      const copyUser1 = Object.assign(state.user);
      const copyPartner = Object.assign(state.partner);
      copyUser1.data.linkingCode = action.payload.id;
      copyPartner.data.linkingCode = action.payload.id
      return {
        ...state,
        loading: false,
        user: copyUser1,
        partner: copyPartner
      }

    };

    default:
      return state;

  }
}

export default reducer;