import axios from "axios";
const TOKEN_URL = 'http://localhost:3001'
const BASE_URL='http://localhost:3000'


export default axios.create({
    baseURL: TOKEN_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const axiosPublic = {
  axiosPrivate
}




