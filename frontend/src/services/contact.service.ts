
import { Contact } from "model/contact.model";
import {axiosPublic} from "../api/axios";

const API_URL = "api/contacts";

//Create contact information
const registration = (contact: Contact) => {
    const data = {
        contact:contact
    }
    debugger
  return axiosPublic.axiosPrivate.post(API_URL + "/register", {
    data
  })
};

const ContactService = {
    registration
}

export default ContactService;

