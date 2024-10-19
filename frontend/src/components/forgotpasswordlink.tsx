// import { z } from "zod";

import { useRef } from "react";
import UserService from "src/services/user.service";

const ForgotPasswordLink = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(emailRef.current?.value)
    if (emailRef.current==null || emailRef.current.value === "")
      return alert("Please enter your email address.");
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
  return (
    <div className="container" style={{ minHeight: "100vh", marginTop: "3%" }}>
      <div className="row">
        <div className="col-md-4 col-md offset-4">
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
                       
                        />
                      </div>
                        {}
                    </div>
                    <div className="form-group">
                      <button
                        onClick={handleSubmit}
                        name="recover-submit"
                        className="btn btn-dark btn-lg btn-block"
                        value="Reset Password"
                        type="submit"
                      />
                    </div>

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
