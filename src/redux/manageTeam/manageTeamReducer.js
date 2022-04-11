import {
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_FAILURE,
  CHANGE_TEAM_PAGE,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_FAILURE,
} from "./manageTeamTypes";

const initialState = {
  employees: [],
  loading: false,
  currPage: 0,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TEAM_PAGE:
      return {
        ...state,
        currPage: action.payload,
        loading: true,
      };
    case GET_ALL_EMPLOYEE_REQUEST:
      return {
        ...state,
        employees: [],
        loading: true,
      };
    case GET_ALL_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case GET_ALL_EMPLOYEE_FAILURE:
      return {
        ...state,
        employees:[],
        loading: false,
        err: action.payload,
      };
    case INVITE_REQUEST:
      return {
        ...state,
        employees: [],
        loading: true,
      };
    case INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
        err: null,
      };
    case INVITE_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export default teamReducer;
