import axios from "axios";
import { history } from "./../../history";

export const authenticateUser = (username, password, date) => {
  const getAuth = axios.post("/api/users/login", { username, password, date })
  return (dispatch, state) => {
    dispatch({
      type: "AUTH_USER",
      payload:
        getAuth
          .then((res) => {
            return res.data
          })
          .catch((err) => {
            return err
          })
    })
  }
}

export const createUser = (username, password, date) => {
  const createLogin = axios.post(`/api/users/signup`, {
    username: username,
    password: password,
    date
  })
  return (dispatch) => {
    dispatch({
      type: "CREATE_USER",
      payload:
        createLogin
          .then((res) => {
            console.log(res);
            return res.data
          })
    })
  }
}