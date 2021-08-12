import Axios from "axios";
import axios from "axios";
import { APIURL } from "../utils";

export function setToken(tokenName: string, tokenValue: string) {
  localStorage.setItem(tokenName, tokenValue);
}

export function getToken(tokenName: string) {
  return localStorage.getItem(tokenName);
}
export function removeToken(tokenName: string) {
  localStorage.removeItem(tokenName);
}
export const setInterceptors = () => {

  var token = getToken("access_token");

  if (token) {
    addRequestInterceptor();
  }
  addResponseInterceptor();
}

function addRequestInterceptor() {

  axios.interceptors.request.use(
    (config) => {
      const token = getToken('access_token');
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
        console.log(config.headers["Authorization"]);

      }
      return config;
    },
    (error) => {
      console.log("Promise 1 rejected");
      Promise.reject(error);
    }
  );
}

function addResponseInterceptor() {
  let session = getToken("refresh_token");
  axios.interceptors.response.use(response => response, error => {
    const oldRequest = error.config;
    if (error.response.status === 401 && oldRequest.url === APIURL + '/oauth/token') {

      return Promise.reject(error);
    }
    if (error.response.status === 401 && !oldRequest._retry) {
      oldRequest._retry = true;
      return Axios.post(APIURL + '/oauth/token', {
        client_id: process.env.REACT_APP_CLIENT_ID,
        refresh_token: session,
        grant_type: 'refresh_token'
      })
        .then(res => {
          if (res.status === 200) {
            setToken('access_token', res.data.data.access_token)
            setToken('refresh_token', res.data.data.refresh_token)
          }
          axios.defaults.headers.common['Authorization'] = 'Bearer 45'
          return axios(oldRequest);
        })
    }
  })
}
