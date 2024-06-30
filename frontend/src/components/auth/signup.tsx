import * as _ from "lodash";
import { Link } from "react-router-dom";
import { z } from "zod";
import React, { FormEvent, useEffect, useState } from "react";
import UserService from "../../services/user.service";
// import { toast } from 'react-toastify';
import service from "../../services/contact.service";
import { Contact } from "../../model/contact.model";
import { AccountType, Role } from "../../../../backend/main-server/shared/utils/enums";
const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username is required" })
    .max(20, { message: "Username must be at most 20 characters" })
    .refine((val) => !val.includes(" "), {
      message: "Username cannot contain spaces",
    }),
});
let signupSchema = userSchema
  .extend({
    accountType: z.enum(["personal", "business", ""]),
    firstName: z.string().min(3, { message: "First Name is required" }),
    lastName: z.string().min(3, { message: "Last Name is required" }),
    email: z
      .string()
      .min(5, { message: "Email is required" })
      .email({ message: "Invalid email address" })
      .max(254, { message: "Email must be at most 254 characters" }), // Email validation
    password: z
      .string()
      .min(8, { message: "Password is required" })
      .max(128, { message: "Password must be at most 128 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is required" })
      .max(128, {
        message: "Confirm Password must be at most 128 characters long",
      }),
    termsofUser: z.boolean().refine((val) => val, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .superRefine((data, ctx) => {
    debugger;
    if (data.accountType === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Account type is required",
        path: ["accountType"],
      });
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type signupProps = z.infer<typeof signupSchema>;
const Signup = () => {
  const [formvalues, setFormvalues] = useState<signupProps>({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    termsofUser: false,
  });

  // const notify =()=> toast("Account was successfully signed up")

  // const data={
  //   title: 'Important Message!!',
  //   message:`You indicated you're a new customer, but an account already
  //   exists with the email address`
  // }
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
        // setErrors(fieldErrors);
      }
    } catch (error) {
      //console.log(error);
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
      // if(!username) return;
      const response = await UserService.checkUserName(username);
      debugger;
      if (response.data) {
        setIsTaken(response.data.isTaken);
        errors.username = undefined;
        formvalues.username = username;
      }
    };
    checkUserName();
  }, [username]);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    setUsername(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger;

    try {
      const result = signupSchema.safeParse(formvalues);
      if (!result.success) {
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
        firstName: formvalues.firstName,
        lastName: formvalues.lastName,
        stateId: 1,
        accountTypeId:
          formvalues.accountType === "personal"
            ? AccountType.Personal
            : AccountType.Business,
        user: {
          email: formvalues.email,
          username: formvalues.username,
          password: formvalues.password,
          roles:[{roleId:Role.Customer}]
        },
      };
      debugger;
      service.registration(contact).then(
        (result) => {
          console.log("Form submitted successfully:", result.data);
        },
        (err) => {
          console.log(err);
        }
      );
      console.log('Form submitted successfully":', result.data);
    } catch (error) {
      console.log(error);
    }
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
                    <form onSubmit={handleSubmit}>
                      {/* <ValidationAlert data={data} /> */}
                      <div className="form-group form-row mb-4 form-radio">
                        <div className="col">
                          <input
                            className="form-radio-input"
                            type="radio"
                            defaultValue={"personal"}
                            data-accounttype={"personal"}
                            value={formvalues.accountType}
                            name="accountType"
                            onChange={handleChange}
                          />
                          <label
                            style={{ margin: "0 10px" }}
                            className="form-radio-label"
                            htmlFor="contact_type"
                          >
                            Personal
                          </label>
                        </div>
                        <div className="col">
                          <input
                            className="form-radio-input"
                            type="radio"
                            defaultValue={"business"}
                            data-accounttype={"business"}
                            value={formvalues.accountType}
                            name="accountType"
                            onChange={handleChange}
                          />

                          <label
                            style={{ margin: "0 10px" }}
                            className="form-radio-label"
                            htmlFor="contact_type"
                          >
                            Business
                          </label>
                        </div>
                      </div>
                      {errors.accountType && (
                        <div className="form-row mb-4">
                          <div className="col">
                            <span className="text-danger">
                              {errors.accountType}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="form-row mb-4">
                        <div className="col">
                          <input
                            maxLength={50}
                            name="firstName"
                            value={formvalues.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className="form-control"
                            placeholder="First name"
                          />
                          {errors.firstName && (
                            <div className="form-row">
                              <div className="col">
                                <span className="text-danger">
                                  {errors.firstName}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col">
                          <input
                            maxLength={50}
                            name="lastName"
                            value={formvalues.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                          />
                          {errors.lastName && (
                            <div className="form-row">
                              <div className="col">
                                <span className="text-danger">
                                  {errors.lastName}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-row mb-4">
                        <div className="col">
                          <input
                            maxLength={254}
                            name="email"
                            value={formvalues.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="email"
                            className="form-control"
                            placeholder="Email address"
                          />
                          {errors.email && (
                            <div className="form-row mb-1">
                              <div className="col">
                                <span className="text-danger">
                                  {errors.email}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-row mb-4 ">
                        <div className="col">
                          <input
                            maxLength={30}
                            name="username"
                            autoComplete="username"
                            value={username}
                            onBlur={handleBlur}
                            onChange={handleUserNameChange}
                            type="text"
                            className="form-control"
                            placeholder="Username"
                          />
                          {errors.username && (
                            <div className="form-row mb-1">
                              <div className="col">
                                <span className="text-danger">
                                  {errors.username}
                                </span>
                              </div>
                            </div>
                          )}
                          {istaken ? (
                            <div className="form-row mb-1">
                              <div className="col">
                                <span className="text-danger">
                                  {<p>Username already taken.</p>}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="form-row mb-4">
                        <div className="col">
                          <input
                            maxLength={128}
                            autoComplete="new-password"
                            name="password"
                            value={formvalues.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            style={{ paddingRight: "30px" }}
                          />
                          {errors.password && (
                            <div className="form-row mb-1">
                              <div className="col">
                                <span className="text-danger">
                                  {errors.password}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-row mb-4">
                        <div className="col">
                          <input
                            maxLength={128}
                            autoComplete="new-password"
                            name="confirmPassword"
                            value={formvalues.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                          />
                          {errors.confirmPassword && (
                            <div className="form-row mb-1">
                              <div className="col">
                                <span className="text-danger">
                                  {errors.confirmPassword}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group d-flex justify-content-left mb-4">
                        <div className="form-check">
                          <input
                            name="termsofUser"
                            defaultValue={"false"}
                            id="termsofUser"
                            checked={formvalues.termsofUser}
                            onChange={handleChange}
                            className="form-check-input"
                            type="checkbox"
                          />
                          <span>I agree to the Terms of User </span>
                          {errors.termsofUser && (
                            <div className="form-row mb-1">
                              <div className="col">
                                <span className="text-danger">
                                  {errors.termsofUser}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          // onClick={handleSubmit}
                          data-mdb-ripple-color="dark"
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                      {/* <a className="small text-muted" href="#!">
                        Forgot password?
                      </a> */}
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Do have an account?{" "}
                        <Link to="/login" style={{ color: "#393f81" }}>
                          Sign in
                        </Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
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
