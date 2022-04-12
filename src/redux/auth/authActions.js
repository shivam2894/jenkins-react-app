import axios from "axios";
import { toast } from "react-toastify";
import {
  AUTH_REQUEST,
  AUTH_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SESSION_EXPIRED,
} from "./authTypes";

axios.defaults.baseURL = "http://34.211.143.214:8080/api";

export const signUp = (user) => {
  console.log("hello");
  return (dispatch) => {
    dispatch({
      type: AUTH_REQUEST,
    });
    axios
      .post("/signup", {
        userName: user.username,
        name: user.name,
        email: user.email,
        password: user.password,
        dob: user.dob,
        company: {
          companyName: user.companyName,
          gstin: user.gstin,
          address: user.address,
        },
        roles: user.roles,
      })
      .then(() =>
        dispatch({
          type: SIGN_UP_SUCCESS,
        })
      )
      .catch((err) =>
        dispatch({
          type: AUTH_FAILURE,
          payload: err,
        })
      );
  };
};

export const signIn = (userName, password) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_REQUEST,
    });
    axios
      .post("/signin", {
        userName,
        password,
      })
      .then((res) => {
        
        dispatch({ type: SIGN_IN_SUCCESS, payload: res.data.jwt})})
      .catch((err) =>
        dispatch({
          type: AUTH_FAILURE,
          payload: err.response.data,
        })
      );
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      axios
      .post(`/user/forgot_password/${email}`)
      .then(() => resolve())
      .catch(() => reject())
    });
    toast.promise(promise,{
      pending: "Sending reset password link to your Email",
      success: "Email sent successfully. Please check your inbox",
      error: "Failed to send Email",
    })
  }
};

export const resetPassword = (token, newPassword, navigate) => {
  return () => {
    axios
      .post("/user/reset_password", { token, newPassword })
      .then(() => {
        navigate("/");
        toast.success("Password changed successfully");
      })
      .catch(() => {
        navigate("/");
        toast.error("Failed to change Password. Invalid Password reset link!");
      });
  };
};

export const sessionExpired = () => {
  return {
    type: SESSION_EXPIRED,
  };
};
