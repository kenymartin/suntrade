import axios from "../api/axios";

export const signup = async (email: string, password: string) => {
  const response = await axios
    .post("/signup", {
      email,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
export const login = async (username: string, password: string) => {
  const response = await axios.post("/login", {
    username,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("dataToken", JSON.stringify(response.data));
    console.log(response.data)
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};
export const isLoggedIn = () => {
  return localStorage.getItem("user") != null;
}
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
};
const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
};
// export default AuthService;
export default AuthService;
