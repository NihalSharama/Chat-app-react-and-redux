import { authConstanst } from "../constants";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case `${authConstanst.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case `${authConstanst.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${authConstanst.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.e,
      };
      break;
    case `${authConstanst.USER_LOGOUT}_REQUEST`:
      break;
    case `${authConstanst.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initialState,
      };
      break;
    case `${authConstanst.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    default:
      return state;
  }

  return state;
};
