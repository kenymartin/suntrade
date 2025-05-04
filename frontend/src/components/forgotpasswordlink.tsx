// import { z } from "zod";

import { useRef, useState } from "react";
import UserService from "src/services/user.service";

const ForgotPasswordLink = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [message,setMessage] =useState("");

  const handleBlur = (_e: React.FocusEvent) => {
    setMessage("");
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(emailRef.current?.value)
    if (emailRef.current==null || emailRef.current.value === ""){
      setMessage("Please enter your email address.");
      return alert("Please enter your email address.");
  }
    UserService.ForgotPasswordLink(emailRef.current.value)
      .then((response) => {
        if (response.status === 200) {
          alert("Password reset link has been sent to your email.");
        } else {
          alert("Failed to send password reset link.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
  
  }
  const handleFocus = (_e: React.FocusEvent) => {
    setMessage("");
    
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <h3>
                  <i className="fa fa-lock fa-4x"></i>
                </h3>
                <h2 className="text-center">Forgot Password?</h2>
                <p>You can reset your password here.</p>
                <div className="panel-body">
                  <form
                    id="register-form"
                    role="form"
                    autoComplete="off"
                    className="form"
                    method="post"
                  >
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="glyphicon glyphicon-envelope color-blue"></i>
                        </span>
                        <input
                          ref={emailRef}
                          id="email"
                          name="email"
                          placeholder="email address"
                          className="form-control"
                          type="email"
                          onChange={()=>handleChange}
                          onFocus={()=>handleFocus}
                          onBlur={()=>handleBlur}
                        />
                      </div>
                      {
                        message && <div className="alert alert-danger">{message}</div>
                      }
                    </div>

                    <button
                      onClick={handleSubmit}
                      data-mdb-ripple-color="dark"
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-dark btn-lg btn-block"
                      type="submit"
                    >
                      Submit
                    </button>

                    {/* <input type="hidden" className="hide" name="token" id="token" value=""/>  */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordLink;
