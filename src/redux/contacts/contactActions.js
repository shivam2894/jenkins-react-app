import { toast } from "react-toastify";
import { getAuthenticatedRequest } from "..";
import {
  CONTACT_ADD_REQUEST,
  CONTACT_ADD_FAILURE,
  GET_ALL_CONTACTS_SUCCESS,
  GET_ALL_CONTACTS_FAILURE,
  CHANGE_CONTACT_PAGE,
  EDIT_CONTACT_OPEN,
  EDIT_CONTACT_CLOSE,
} from "./contactTypes";

export const changeContactPage = (pageNo) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_CONTACT_PAGE, payload: pageNo });
    dispatch(fetchAllContacts());
  };
};

export const fetchAllContacts = () => {
  return (dispatch, getState) => {
    dispatch({ type: CONTACT_ADD_REQUEST });
    getAuthenticatedRequest()
      .get(`/companies/page/${getState().contacts.currPage}`)
      .then((res) => {
        dispatch({ type: GET_ALL_CONTACTS_SUCCESS, payload: res.data });
      })
      .catch((err) =>
        dispatch({ type: GET_ALL_CONTACTS_FAILURE, payload: err.response })
      );
  };
};

export const addContact = (contact) => {
  return (dispatch) => {
    dispatch({ type: CONTACT_ADD_REQUEST });
    getAuthenticatedRequest()
      .post("/companies/add", contact)
      .then(() => {
        dispatch(fetchAllContacts());
        toast.success("Successfully added contact");
      })
      .catch((err) => {
        dispatch({ type: CONTACT_ADD_FAILURE, payload: err.response.data });
        dispatch(fetchAllContacts());
      });
  };
};

export const editContactOpen = (contact) => {
  return {
    type: EDIT_CONTACT_OPEN,
    payload: contact,
  };
};

export const editContactClose = () => {
  return {
    type: EDIT_CONTACT_CLOSE,
  };
};

export const editContact = (contact) => {
  return (dispatch) => {
    getAuthenticatedRequest()
      .patch(`/companies/edit/${contact.id}`, {
        id: contact.id,
        companyName: contact.companyName,
        gstin: contact.gstin,
        address: contact.address,
      })
      .then(() => {
        dispatch(fetchAllContacts());
        dispatch(editContactClose());
        toast.success("Updated contact successfully");
      })
      .catch((err) => {
        dispatch({
          type: GET_ALL_CONTACTS_FAILURE,
          payload: err.response.data,
        });
        dispatch(fetchAllContacts());
      });
  };
};

export const deleteContact = (id) => {
  return (dispatch) => {
    getAuthenticatedRequest()
      .delete(`/companies/delete/${id}`)
      .then(() => dispatch(fetchAllContacts()))
      .catch((err) =>
        dispatch({ type: GET_ALL_CONTACTS_FAILURE, payload: err.response.data })
      );
  };
};
