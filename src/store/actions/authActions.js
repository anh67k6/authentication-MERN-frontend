import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "../types/authType";

export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/josn",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/messenger/user-register",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: err.response.data.error.errorMessage,
        },
      });
    }
  };
};

// 


export const userLogin = (data) => {

  console.log(data);

  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/messenger/user-login",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          error: err.response.data.error.errorMessage,
        },
      });
    }
  };
};