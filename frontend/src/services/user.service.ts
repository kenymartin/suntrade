import { axiosPrivate } from "../api/axios";
import axios from "../api/axios";

const API_URL = "api/users";

// Get all users
const getAllUsers = () => {
  return axios.get(API_URL);
};

// Get user by id
const getUserById = (id: number) => {
  return axios.get(API_URL + "/" + id);
};

// Create new user
const createUser = (data: any) => {
  return axios.post(API_URL, data);
};

// Update user
const updateUser = (id: number, data: any) => {
  return axios.put(API_URL + "/" + id, data);
};

// Delete user
const deleteUser = (id: number) => {
  return axios.delete(API_URL + "/" + id);
};

//Additional functions
const checkUserName = async (username:string) => {
  const response = await axiosPrivate.post(API_URL + "/checkUserName",
  {username: username},
  
);
  //console.log(response.data);
  return response.data;
}
const checkUserEmail = (email:string) => {
  return axios.post(API_URL + "/check-email", {email: email});
}

// Export all functions
const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // Additional functions
  checkUserName,
  checkUserEmail,
};

export default UserService;
