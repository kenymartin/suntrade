
import axios from '../api/axios';

const API_URL = '/api/userlogin'

const getUserLogin = () => {
   const dataToken = JSON.parse(localStorage.getItem("dataToken") ?? "{}");
    return axios.get("http://localhost:3000" + API_URL, {
      headers: {
        Authorization: "Bearer " + dataToken.accessToken,
      },
    });
}
 const UserLoginService ={
   getUserLogin
 }
export default UserLoginService;