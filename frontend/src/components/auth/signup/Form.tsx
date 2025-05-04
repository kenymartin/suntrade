import { z } from "zod";
import Schema from "../signup/schemas/FormSchema";
import { Link } from "react-router-dom";
import React from "react";

const signupSchema = Schema.signupSchema;
type signupProps = z.infer<typeof signupSchema>;
interface EventHandlers {
  handlerSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleUserNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface FormData {
  formvalues: {
    accountType: "" | "personal" | "business";
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    termsofUser: boolean;
  };
  username: string;
  istaken: boolean;
  isSubmitting: boolean;
  errors: Partial<Record<keyof signupProps, string>>;
 
}
interface FormProps {
  formData: FormData;
  eventHandler: EventHandlers;
}

const Form: React.FC<FormProps> = ({ formData, eventHandler }) => {
  const { formvalues, errors, istaken, isSubmitting, username } = formData;
  const {
    handleChange,
    handleBlur,
    handlerSubmit: handleSubmit,
    handleUserNameChange,
  } = eventHandler;
  return (
    <form onSubmit={handleSubmit}>
    { true && <React.Fragment>
      <div className="form-group form-row mb-4 form-radio">
        <div className="col">
          <input
            className="form-radio-input"
            type="radio"
            //defaultValue={"personal"}
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
            //defaultValue={"business"}
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
            <span className="text-danger">{errors.accountType}</span>
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
                <span className="text-danger">{errors.firstName}</span>
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
                <span className="text-danger">{errors.lastName}</span>
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
                <span className="text-danger">{errors.email}</span>
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
                <span className="text-danger">{errors.username}</span>
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
                <span className="text-danger">{errors.password}</span>
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
                <span className="text-danger">{errors.confirmPassword}</span>
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
                <span className="text-danger">{errors.termsofUser}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="pt-1 mb-4">
        <button
          disabled={isSubmitting}
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
      </React.Fragment>
    }
    </form>
  );
};


export default Form;
