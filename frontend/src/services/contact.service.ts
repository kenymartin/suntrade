
import { Contact } from "@shared/model/contact.model";
import {axiosPublic} from "../api/axios";

const URL = "api/contacts";
interface ApiResponse{
  message?: string;
  success: boolean;
  data?: any;
  error?: any;
}
//Create contact information
const registration = (contact: Contact) => {
  debugger
    // const data = {
    //     contact:contact
    // }

  return axiosPublic.axiosPrivate.post<ApiResponse>(URL + "/register", {
    data: {contact: contact}
  })
};

const ContactService = {
  registration,
};

export default ContactService;

