import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { signUp } from "../Redux/Actions/Action";
import { Redirect } from "react-router-dom";


import "./SignUp.css";

const SignUp = (props) => {
  let isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "Tunis",
  });

  const dispatch = useDispatch();

  const signUpHandler = (e) => {
    e.preventDefault();

    dispatch(signUp(form));
    props.history.push("/");
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <div className="signin-conatiner">
        <div className="login-box">
          <h2>Sign up</h2>
          <form>
            <div className="user-box">
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={onChangeHandler}
              />
              <label htmlFor="name">Username</label>
            </div>

            <div className="user-box">
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={onChangeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="user-box">
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={onChangeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="user-box">
              <label style={{ fontSize: "13px" }} htmlFor="city">
                City
              </label>
              <select name="city" id="city" required onChange={onChangeHandler}>
                <option value="Tunis">Tunis</option>
                <option value="Sfax">Sfax</option>
                <option value="Sousse">Sousse</option>
                <option value="Gabès">Gabès</option>
                <option value="Kairouan">Kairouan</option>
                <option value="Bizerte">Bizerte</option>
                <option value="Gafsa">Gafsa</option>
                <option value="Nabeul">Nabeul</option>
                <option value="Ariana">Ariana</option>
                <option value="Kasserine">Kasserine</option>
                <option value="Monastir">Monastir</option>
                <option value="Tataouine">Tataouine</option>
                <option value="Medenine">Medenine</option>
                <option value="Béja">Béja</option>
                <option value="Jendouba">Jendouba</option>
                <option value="El Kef">El Kef</option>
                <option value="Mahdia">Mahdia</option>
                <option value="Sidi Bouzid">Sidi Bouzid</option>
                <option value="Tozeur">Tozeur</option>
                <option value="Siliana">Siliana</option>
                <option value="Kebili">Kebili</option>
                <option value="Zaghouan">Zaghouan</option>
                <option value="Ben Arous">Ben Arous</option>
                <option value="Manouba">Manouba</option>
              </select>
            </div>

            <button style={{ color: "white" }} onClick={signUpHandler}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="./login" className="login-link">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(SignUp);
