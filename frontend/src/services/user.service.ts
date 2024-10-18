import { axiosPrivate, axiosPublic } from "../api/axios";
import axios from "../api/axios";
import ApiResponse from "../services/interfaces/ApiResponse";
import { AxiosResponse } from "axios";
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
const updateUser = (id: string, data: any) => {
  return axios.patch<ApiResponse>(API_URL + "/" + id, data);
};

// Delete user
const deleteUser = (id: number) => {
  return axios.delete(API_URL + "/" + id);
};

//Additional functions
const checkUserName = async (username:string) => {
  const response = await axiosPrivate.post(API_URL + "/checkUserName", {
    username: username,
  });
  //console.log(response.data);
  return response.data;
}
const checkUserEmail = (email:string) => {
  return axios.post(API_URL + "/check-email", {email: email});
}
const ActiveUser =async (id: number,isReactivation:boolean=false) => {
  const response = await axiosPublic.axiosPrivate.patch<AxiosResponse>(API_URL + "/ActiveUser", {id,isReactivation});
  return response;
}
const ReactivateUser =async (id: number) => {
  const response = await axiosPublic.axiosPrivate.patch<AxiosResponse>(API_URL + "/ReactivateUser", {id});
  return response;
}
const ResendActivationLink = async (id:number) => {
  const response = await axiosPublic.axiosPrivate.post<ApiResponse>(API_URL + "/ResendActivationLink", {id});
  return response;
}
const ForgotPasswordLink = async (email:string) => {
  const response = await axiosPublic.axiosPrivate.post<ApiResponse>(API_URL + "/ForgotPasswordLink", {email});
  return response;
}
const changePassword = async (id:number,password:string) => {
  const response = await axiosPublic.axiosPrivate.post<ApiResponse>(API_URL + "/ChangePassword", {id,password});
  return response;
}

// Export all functions
const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  ActiveUser,
  checkUserName,
  checkUserEmail,
  ReactivateUser,
  ResendActivationLink,
  ForgotPasswordLink,
  changePassword,
};

export default UserService;
