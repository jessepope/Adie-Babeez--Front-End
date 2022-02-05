import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
import AppContext from "../AppContext"

function LoginForm(props) {
  const [formField, setFormField] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const myContext = useContext(AppContext);

  const onFieldChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
  
    // /*We are going into the DOM taking specific element which is the GET element by ID we wew taking that element and bringing it into our function as a local varible so we can do things with it.*/
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let validEmail = true;
    let validPassword = true;
    let showErrorMessage = false;
    if (formField.email.length === 0) {

      email.style.borderColor = "red";
      showErrorMessage = true;
      validEmail = false;
    }
    if (formField.password.length === 0) {
      password.style.borderColor = "red";
      showErrorMessage = true;
      validPassword = false;
    }
    // let errorMessage = <p></p>;
    // if (showErrorMessage === true ) {
    //   errorMessage = <p className="error-message"> Error Message </p>;
    // };
    if (validEmail === true && validPassword === true) {
      console.log(formField);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, [formField])
        .then((response) => {
          myContext.setCurrentUser(response.data);
          navigate(`/feed`);
          // navigate seems to be really slow? Maybe we can try to use something else, like Link?
        })
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
      <div className ='error-message-container'></div>
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
