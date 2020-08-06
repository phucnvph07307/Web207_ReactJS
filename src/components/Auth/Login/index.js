import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    error: "",
    loggedIn: false,
  });

  const onSubmit = async (data) => {
    console.log(data);
    const res = await axios.post("http://127.0.0.1:8000/api/login", data);
    const result = await res;
    if (res.status < 300) {
      history.push("/admin");
    } else {
      setAuth({
        email: "",
        password: "",
        error: "Tài khoản sai",
      });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-5 col-md-5">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-12">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                          <input
                            defaultValue={auth.email}
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                            ref={register({
                              required: true,
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email không hợp lệ",
                              },
                            })}
                          />
                          <span className="text-danger">
                            {errors.email && errors.email.message}
                            {errors.email?.type === "required" &&
                              "Vui lòng nhập Email"}
                          </span>
                        </div>
                        <div className="form-group">
                          <input
                            defaultValue={auth.password}
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            ref={register({
                              required: true,
                            })}
                          />
                          <span className="text-danger">
                            {errors.email?.type === "required" &&
                              "Vui lòng nhập Password"}
                          </span>
                        </div>
                        {/* <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                              name="remember"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div> */}
                        <span className="text-danger">
                          <center>{auth.error}</center>
                        </span>
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Login
                        </button>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="register.html">
                          Create an Account!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
