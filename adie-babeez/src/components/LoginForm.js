import React, { useState, useEffect } from "react";
//import axios from "axios";
import './LoginForm.css';

function LoginForm(){
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
    const userInfo = document.getElementById('userInfo');
    const password = document.getElementById('password');
    /* add conditional logic to check valid data 
    if form.length > 80 , do .... */

    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/users/login/verify`, formField)
    .then((response) => {
      setFormField({
        userInfo: "",
        password: "",
      });
    })  
    .catch((err) => {
      console.log(err);
    });  
  }




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