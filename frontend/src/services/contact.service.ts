
import { Contact } from "@shared/model/contact.model";
import {axiosPublic} from "../api/axios";

const API_URL = "api/contacts";
interface ApiResponse{
  message?: string;
  success: boolean;
  data?: any;
  error?: any;
}
//Create contact information
const registration = (contact: Contact) => {
    const data = {
        contact:contact
    }
    debugger
  return axiosPublic.axiosPrivate.post<ApiResponse>(API_URL + "/register", {
    data
  })
};

const ContactService = {
  registration,
};

export default ContactService;

