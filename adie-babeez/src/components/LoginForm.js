import React, { useState, useEffect } from "react";
//import axios from "axios";
import './LoginForm.css';

function LoginForm(props){
  const [formField, setFormField] = useState({ userInfo: "", password: "" })

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

  const onSubmit = (e) => {
    e.preventDefault();
    /*We are going into the DOM taking specific element which is the GET element by ID we wew taking that element and bringing it into our function as a local varible so we can do things with it.*/
    const userInfo = document.getElementById('userInfo');
    const password = document.getElementById('password');
    /* add conditional logic to check valid data 
    if form.length > 80 , do .... */
    const validUserInfo = true 
    const validPassword = true
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
      userId = response.data['user_id']
      updateCurrUser(userId)
      setFormField({
        userInfo: "",
        password: "",
      });
    })  
    /*possibly adding logic*/
    .catch((err) => {
      console.log(err);
    });  
  }};




  return (
    <div className="login-page">
      <h1 className="title">Adie-Babeez</h1> 
      <h3 className="slogan">Connecting Adie Parents for all their parenting needs</h3>
      <form className="login-form" onSubmit={}>

        <input 
        id="userInfo"
        minLength={1}
        maxLength={80}
        name="userInfo"
        value= {formField.userInfo}
        placeholder="email or username" 

        onChange={onUserInfoChange}
        ></input>
        <br></br>
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
    </div>
  );
}
export default LoginForm;