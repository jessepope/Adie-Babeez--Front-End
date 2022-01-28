import React, { useState, useEffect } from "react";
//import axios from "axios";
import './LoginForm.css';

function LoginForm(){

  return (
    <div className="login-page">
      <h1 className="title">Adie-Babeez</h1> 
      <h3 className="slogan">Connecting Adie Parents for all their parenting needs</h3>
      <form className="login-form">
        <input 
        id="login-email"
        minLength={1}
        maxLength={80}
        name="Email"
        value= ''
        placeholder="Email"

       // onChange={onEmailChange}
        ></input>
        <br></br>
        <input 
        id="login-secret"
        minLength={1}
        maxLength={100}
        name="Password"
        value= ''
        placeholder="Password"
        //onChange={onSecretChange}
        ></input>
      </form>
    </div>
  );
}
export default LoginForm;