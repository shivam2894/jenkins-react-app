import {
    CONTACT_ADD_REQUEST,
    CONTACT_ADD_SUCCESS,
    CONTACT_ADD_FAILURE,
    GET_ALL_CONTACTS_SUCCESS,
    GET_ALL_CONTACTS_FAILURE,
    CHANGE_CONTACT_PAGE,
    EDIT_CONTACT_OPEN,
    EDIT_CONTACT_CLOSE,
  } from "./contactTypes";
  
  const initialState = {
    res: null,
    companies: [],
    err: "",
    currPage: 0,
    contactToEdit: {
      id: "",
      companyName: "",
      gstin: "",
      address: "",
    },
    isEdit: false,
  };
  
  export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_CONTACT_PAGE:
        return {
          ...state,
          currPage: action.payload,
        };
      case CONTACT_ADD_REQUEST:
        return {
          ...state,
          res: null,
          companies: [],
          loading: true,
        };
      case CONTACT_ADD_SUCCESS:
        return {
          ...state,
          res: action.payload,
          loading: false,
        };
      case CONTACT_ADD_FAILURE:
        return {
          ...state,
          loading: false,
        };
      case GET_ALL_CONTACTS_SUCCESS:
        return {
          ...state,
          loading: false,
          companies: action.payload,
        };
      case GET_ALL_CONTACTS_FAILURE:
        return {
          ...state,
          loading: false,
          err: action.payload,
          companies: [],
        };
      case EDIT_CONTACT_OPEN:
        return {
          ...state,
          contactToEdit: action.payload,
          isEdit: true,
        };
      case EDIT_CONTACT_CLOSE:
        return {
          ...state,
          contactToEdit: initialState.contactToEdit,
          isEdit: false,
        };
      default:
        return state;
    }
  };
  