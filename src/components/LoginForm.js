import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';


function LoginForm(props){
  const [formField, setFormField] = useState({ userInfo: "", password: "" })
  let navigate = useNavigate();
  
  const onUserInfoChange = (e) => {
    setFormField({
      ...formField,
      userInfo: e.target.value
    });
  };

  const onPasswordChange = (e) => {
    setFormField({
      ...formField,
      password: e.target.value
    });
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    
    /*We are going into the DOM taking specific element which is the GET element by ID we wew taking that element and bringing it into our function as a local varible so we can do things with it.*/
    const userInfo = document.getElementById('userInfo');
    const password = document.getElementById('password');

    let validUserInfo = true 
    let validPassword = true
    if (formField.userInfo.length ===0 || formField.userInfo.length > 50) {
      /*ADD CSS FOR THE BORDER TO TURN IT RED MAKE A CSS ID TAG FOR THE BOX*/
      userInfo.style.borderColor= 'red'; 
      validUserInfo= false;
    }; 
    if (formField.password.length ===0 || formField.password.length > 50) {
      /*ADD CSS FOR THE BORDER TO TURN IT RED MAKE A CSS ID TAG FOR THE BOX*/
      password.style.borderColor= 'red';
      validPassword = false; 
    };

    if (validUserInfo === true && validPassword === true) {axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/users/login/verify`, formField)
    .then((response) => {
      // if login is incorrect then stay on page and give an error message
      // if login is correct, redirect to homepage
      if (response.status !== 200) {
        // give error messgae, stay on login page
      } else {
        // props.updateCurrUser(response.data)
        navigate(`/feed`);
      }
      setFormField({
        userInfo: "",
        password: "",
      });
      navigate(`/feed`);
    })  
    /*possibly adding logic*/
    .catch((err) => {
      console.log(err);
    });  
  }};




  return (
      <form className="login-form" onSubmit={onLoginFormSubmit}>
        <input 
        id="userInfo"
        minLength={1}
        maxLength={80}
        name="userInfo"
        value= {formField.userInfo}
        placeholder="email or username" 
        onChange={onUserInfoChange}
        ></input>
        <input 
        id="password"
        minLength={1}
        maxLength={100}
        name="password"
        value= {formField.password}
        placeholder="password"
        onChange={onPasswordChange}
        ></input>
        <input type="submit" value="Submit" />
      </form>

  );
}
export default LoginForm;