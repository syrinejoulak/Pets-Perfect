import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Actions/Action";
import { Link, withRouter } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const authSubmitHandler = (e) => {
    if (e.key === "Enter") dispatch(login(form));
    console.log("login", isLoggedIn);
    // props.history.push("/");
  };

  // if (isLoggedIn) {
  //   // return <Redirect to="/" />;
  //   props.history.push("/");
  // }

  return (
    <div className="login-container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Please login</h2>
        <form onKeyPress={(e) => authSubmitHandler(e)}>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={form.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={form.password}
            onChange={onChangeHandler}
          />
        </form>
        <Link to="/signup">
          <p> Don't have an account? Register </p>
        </Link>

        <h2>&nbsp;</h2>
      </div>
    </div>
  );
};

export default withRouter(Login);
