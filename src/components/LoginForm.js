import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
import AppContext from "../AppContext";

function LoginForm(props) {
  const [formField, setFormField] = useState({ email: "", password: "" });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFailedLogin, setShowFailedLogin] = useState(false);

  let navigate = useNavigate();
  const myContext = useContext(AppContext);

  const onFieldChange = (e) => {
    // remove error messages while typing after failed login
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    email.style.borderColor = "black";
    password.style.borderColor = "black";
    setShowErrorMessage(false);
    setShowFailedLogin(false);
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let validEmail = true;
    let validPassword = true;

    if (formField.email.length === 0) {
      email.style.borderColor = "red";
      setShowErrorMessage(true);
      validEmail = false;
    }
    if (formField.password.length === 0) {
      password.style.borderColor = "red";
      setShowErrorMessage(true);
      validPassword = false;
    }

    if (validEmail === true && validPassword === true) {
      console.log(formField);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, [formField])

        .then((response) => {
          myContext.setCurrentUser(response.data);
          navigate(`/feed`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setShowFailedLogin(true);
          }
        });
        console.log(formField)
    }
  };

  const onSignUpClick = (e) => {
    navigate(`/signup`);
  };

  // COMPONENT RENDER
  return (
    <form className="login-form" onSubmit={onLoginFormSubmit}>
      <div className="error-message-container">
        {showErrorMessage ? (
          <p className="error-message"> Email and Password Required </p>
        ) : null}
        {showFailedLogin ? (
          <p className="error-message"> Incorrect Email and/or Password </p>
        ) : null}
      </div>
      <input
        id="email"
        minLength={1}
        maxLength={80}
        name="email"
        value={formField.email}
        placeholder="email"
        onChange={onFieldChange}
      ></input>
      <input
        id="password"
        minLength={1}
        maxLength={100}
        name="password"
        value={formField.password}
        placeholder="password"
        onChange={onFieldChange}
      ></input>
      <input className="button" type="submit" value="Login" />
      <input
        className="button"
        type="submit"
        value="Sign Up"
        onClick={onSignUpClick}
      />
    </form>
  );
}
export default LoginForm;
