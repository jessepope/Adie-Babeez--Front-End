import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
import AppContext from "../AppContext"

function LoginForm(props) {
  const [formField, setFormField] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const myContext = useContext(AppContext);
  const config = {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };

  const onFieldChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    // const updateCurrUser = (props) => {
    //   props.updateCurrUser()
    // };
    // /*We are going into the DOM taking specific element which is the GET element by ID we wew taking that element and bringing it into our function as a local varible so we can do things with it.*/
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let validEmail = true;
    let validPassword = true;
    if (formField.email.length === 0 || formField.email.length > 50) {
      email.style.borderColor = "red";
      validEmail = false;
    }
    if (formField.password.length === 0 || formField.password.length > 50) {
      password.style.borderColor = "red";
      validPassword = false;
    }

    if (validEmail === true && validPassword === true) {
      console.log(formField);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, [formField])
        .then((response) => {
          console.log(response);
          // if login is correct, redirect to homepage
          myContext.setCurrentUser(response.data); /* need to work on it */
          console.log('currentUser',myContext.userVariable)
          navigate(`/feed`);
        })
        /*possibly adding logic*/
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onSignUpClick = (e) => {
      navigate(`/signup`);
  }

  return (
    <form className="login-form" onSubmit={onLoginFormSubmit}>
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
      <input className="button" type="submit" value="Sign Up" onClick={onSignUpClick} />
    </form>
  );
}
export default LoginForm;
