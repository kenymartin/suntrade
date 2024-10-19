import * as _ from "lodash";
import { z } from "zod";
import React, { FormEvent, useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { toast } from "react-toastify";
import service from "../../services/contact.service";
import { Contact } from "@shared/model/contact.model";
import { AccountType, Role } from "@shared/utils/enums.ts";
import Schema from "../auth/signup/schemas/FormSchema.ts";
import Form from "../auth/signup/Form"

const signupSchema = Schema.signupSchema;
type signupProps = z.infer<typeof signupSchema>;
const Signup = () => {
const [formvalues, setFormvalues] = useState<signupProps>(
    {
      accountType: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      termsofUser: false,
    }
  );
const notifySuccess = () => toast("Account was successfully signed up");
const notifyError = () =>
  toast("There was a problem signing up", {
    style: {
      backgroundColor: "lightpink",
      color: "white",
      fontStyle: "bold",
      fontSize: "18px",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [istaken, setIsTaken] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof signupProps, string>>
  >({});
  const validateFields = async (
    fieldName: keyof signupProps,
    value: string | boolean | undefined
  ) => {
    debugger;
    const fieldErrors = { ...errors };
    try {
      signupSchema.parse({ [fieldName]: value });
      fieldErrors[fieldName] = "";
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((err) =>
          err.path.includes(fieldName)
        );
        fieldErrors[fieldName] = fieldError?.message || "";
      }
    }
    setErrors(fieldErrors);
    setIsSubmitting(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    try {
      const fieldErrors = { ...errors };
      const { name, type } = e.target;
      let value: string | boolean | undefined;
      switch (type) {
        case "checkbox":
          value = e.target.checked;
          break;
        case "radio":
          value = e.target.getAttribute("data-accounttype")?.valueOf();
          break;
        default:
          value = e.target.value;
          break;
      }
      setFormvalues({ ...formvalues, [name]: value });
      validateFields(name as keyof signupProps, value);
      if (value === "" || value === false) {
        fieldErrors[name as keyof signupProps] = "";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    debugger;
    try {
      const { name, value } = e.target;
      validateFields(name as keyof signupProps, value);
      handleChange(e);
      console.log("lost focus");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkUserName = async () => {
      const response = await UserService.checkUserName(username);
      // if(!username) return;
      debugger;
      if (response.data) {
        setIsTaken(response.data.isTaken);
        formvalues.username = username;
        errors.username = undefined;
      }
    };
    checkUserName();
  }, [username]);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    setUsername(e.target.value);
  };

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = signupSchema.safeParse(formvalues);
      if (!result.success || istaken) {
        const newErrors: Partial<Record<keyof signupProps, string>> = {};
        result.error?.errors.forEach(async (err) => {
          newErrors[err.path[0] as keyof signupProps] = err.message;
        });
        setErrors(newErrors);
        return;
      }
      //notify();
      debugger;
      const contact: Contact = {
        firstname: formvalues.firstName,
        lastname: formvalues.lastName,
        stateId: "1",
        accountTypeId:
          formvalues.accountType === "personal"
            ? AccountType.Personal
            : AccountType.Business,
        user: {
          email: formvalues.email,
          username: formvalues.username,
          password: formvalues.password,
          roleByUser: [{ roleId: Role.Customer }],
        },
      };
      debugger;
      service.registration(contact).then(
        (result) => {
          if (result.status === 201 || result.data.success) {
            notifySuccess();
          }
          if(result.data.error)  {
            notifyError()
          }
        },
        (err) => {
          console.log(err);
          notifyError();
        }
      );
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };
  const formData = {
    formvalues,
    errors,
    username,
    istaken,
    isSubmitting,
    
  };
  const eventHandlers = {
    handlerSubmit,
    handleChange,
    handleBlur,
    handleUserNameChange,
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#E7E9EB" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <Form formData={formData} eventHandler={eventHandlers}   />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
