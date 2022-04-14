import { toast } from "react-toastify";
import { getAuthenticatedRequest } from "..";
import {
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_FAILURE,
  CHANGE_TEAM_PAGE,
  INVITE_FAILURE,
  INVITE_REQUEST,
} from "./manageTeamTypes";

export const changeTeamPage = (pageNo) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_TEAM_PAGE, payload: pageNo });
    dispatch(fetchAllEmployees());
  };
};

export const fetchAllEmployees = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_ALL_EMPLOYEE_REQUEST });
    getAuthenticatedRequest()
      .get(`/user/getAllUsers/page/${getState().team.currPage}`)
      .then((res) => {
        dispatch({ type: GET_ALL_EMPLOYEE_SUCCESS, payload: res.data });
      })
      .catch((err) =>
        dispatch({ type: GET_ALL_EMPLOYEE_FAILURE, payload: err })
      );
  };
};

export const inviteEmployee = (user) => {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      getAuthenticatedRequest()
        .post("/invite", {
          userName: user.username,
          name: user.name,
          email: user.email,
          password: user.password,
          dob: user.dob,
          roles: user.roles,
        })
        .then(() => resolve(dispatch(fetchAllEmployees())))
        .catch((err) =>
          reject(() => {
            dispatch({ type: INVITE_FAILURE, payload: err.response.data });
            dispatch(fetchAllEmployees());
          })
        );
    });
    toast.promise(promise, {
      pending: "Sending Invite to Employee",
      success: "Invite sent successfully",
      error: "Failed to send invite",
    });
  };
};

export const removeEmployee = (employeeId) => {
  return (dispatch, getState) => {
    getAuthenticatedRequest()
      .delete(`/user/delete/${employeeId}`)
      .then(() => {
        dispatch(fetchAllEmployees(getState().team.currPage));
      })
      .catch((err) =>{
        dispatch({ type: GET_ALL_EMPLOYEE_FAILURE, payload: err })
        dispatch(fetchAllEmployees());
        toast.error("Failed to remove employee");
      }
      );
  };
};
