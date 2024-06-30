//import { Container } from "react-bootstrap";
import AuthService from "../../services/auth.service";
import UserLoginService from "../../services/userlogin.service";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

//Define userSchema
const userSchema = z.object({
  username: z.string().min(3, { message: "username is required" }),
  password: z.string().min(3, { message: "password is required" }),
});

type LoginProps = z.infer<typeof userSchema>;

const Login = () => {
  const [formvalues, setFormvalues] = useState<LoginProps>({
    username: "",
    password: "",
    
  });
  const [errors, setErrors] = useState<Partial<LoginProps>>({});

  const validateField = (fieldName: keyof LoginProps, value: string) => {
    const fieldErrors = { ...errors };

    try {
      userSchema.parse({ [fieldName]: value });
      fieldErrors[fieldName] = "";
    } catch (error) {
      let message = "is required";
      if (error instanceof z.ZodError) {
        fieldErrors[fieldName] =
          error.errors[0].message == "Required"
            ? `${fieldName} ${message}`
            : error.errors[0].message;
      }
    }
    setErrors(fieldErrors);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const fieldErrors = { ...errors };
      const { name, value } = e.target;
      setFormvalues({ ...formvalues, [name]: value });
      validateField(name as keyof LoginProps, value);
      if (value.length >= 2) {
        fieldErrors[name as keyof LoginProps] = "";
        setErrors(fieldErrors);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof LoginProps, value);
    handleChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    debugger;

    try {
      e.preventDefault();
      const result = userSchema.safeParse(formvalues);
      if (!result.success) {
        const newErrors: Partial<LoginProps> = {};
        result.error.errors.forEach((err) => {
          newErrors[err.path[0] as keyof LoginProps] = err.message;
          return;
        });
        setErrors(newErrors);
      }
      AuthService.login(formvalues.username, formvalues.password).then(
        (dataToken) => {
          if (dataToken) {
            UserLoginService.getUserLogin().then(
              (data) => {
                localStorage.setItem("user", JSON.stringify(data));
                window.location.href = "/";
              },
              (err) => {
                if (err.response.status === 403) {
                  const fieldErrors = { ...errors };
                  fieldErrors["username"] = "Invalid username or password";
                  setErrors(fieldErrors);
                  // console.log("error fields", fieldErrors);
                  return;
                }
              }
            );
          }
        }
      );
    } catch (err: any) {
      console.log(err.message);
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
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        />
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Sign into your account
                      </h5>
                      <div data-mdb-input-init="" className="form-outline mb-4">
                        <input
                         maxLength={10}
                          onKeyUp={() => console.log(formvalues)}
                          autoComplete="current-username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          name="username"
                          value={formvalues.username}
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                        />
                        {errors.username && (
                          <span className="text-danger">{errors.username}</span>
                        )}
                        {!errors.username && (
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                        )}
                      </div>
                      <div data-mdb-input-init="" className="form-outline mb-4">
                        <input
                          autoComplete="current-password"
                          maxLength={10}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          name="password"
                          value={formvalues.password}
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                        />
                        {errors.password && (
                          <span className="text-danger">{errors.password}</span>
                        )}
                        {!errors.password &&  (
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                        )}
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          type="submit"
                          data-mdb-ripple-color="dark"
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-dark btn-lg btn-block"
                          
                        >
                          Login
                        </button>
                      </div>
                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={{ color: "#393f81" }}>
                          Register here
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


export default Login;