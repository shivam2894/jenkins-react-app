import {
  AUTH_REQUEST,
  AUTH_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SESSION_EXPIRED,
} from "./authTypes";

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_FAILURE:
      return {
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case SIGN_IN_SUCCESS:
      if(action.rememberMe) localStorage.setItem("jwtToken",action.payload);
      else sessionStorage.setItem("jwtToken",action.payload);
      return {
        loading: false,
        isLoggedIn: true,
        error: "",
        sessionExpired: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        loading: false,
        isLoggedIn: false,
        signUpSuccess: true,
        err: "",
      };
    case SESSION_EXPIRED:
      return {
        ...state,
        sessionExpired: true,
      };
    default:
      return state;
  }
};

export default authReducer;
