import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';

function SignUpForm(props){
  const [formField, setFormField] = useState({ userName: "", email: "", password: "" , pronouns: "", location: "", className: "", campus: "", bio: "" })
  let navigate = useNavigate();

  const onFieldChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value
    });
  };

  const onSignUpFormSubmit = (e) => {
    e.preventDefault();
    
    /*We are going into the DOM taking specific element which is the GET element by ID we wew taking that element and bringing it into our function as a local varible so we can do things with it.*/
    const userName = document.getElementById('userInfo');
    const password = document.getElementById('password');
    const email = document.getElementById('email');
    // const pronouns = document.getElementById('pronouns');
    // const location = document.getElementById('location');
    // const className = document.getElementById('className');
    // const campus = document.getElementById('campus');
    // const bio = document.getElementById('bio');

    const validData = true

      
    if (formField.userName.length ===0 || formField.userName.length > 50) {
      /*ADD CSS FOR THE BORDER TO TURN IT RED MAKE A CSS ID TAG FOR THE BOX*/
      userName.style.borderColor= 'red'; 
      validData= false;
    }; 
    if (formField.password.length ===0 || formField.password.length > 50) {
      /*ADD CSS FOR THE BORDER TO TURN IT RED MAKE A CSS ID TAG FOR THE BOX*/
      password.style.borderColor= 'red';
      validData= false; 
    };
    if (formField.email.length ===0 || formField.email.length > 50) {
      /*ADD CSS FOR THE BORDER TO TURN IT RED MAKE A CSS ID TAG FOR THE BOX*/
      email.style.borderColor= 'red';
      validData = false; 
    };

    if (validData === true) {axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, formField)
    .then((response) => {
      /*userId = response.data['user_id']
      console.log('user_id', userId)
      props.updateCurrUser(userId)*/
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
      <form className="sign-up-form" onSubmit={onSignUpFormSubmit}>
        <input 
        id="userName"
        minLength={1}
        maxLength={80}
        name="user-name"
        value= {formField.userName}
        placeholder="userName" 
        onChange={onFieldChange}
        ></input>
        <input 
        id="email"
        minLength={1}
        maxLength={80}
        name="email"
        value= {formField.email}
        placeholder="email" 
        onChange={onFieldChange}
        ></input>
        <input 
        id="password"
        minLength={1}
        maxLength={100}
        name="password"
        value= {formField.password}
        placeholder="password"
        onChange={onFieldChange}
        ></input>
        <input 
        id="pronouns"
        minLength={1}
        maxLength={100}
        name="pronouns"
        value= {formField.pronouns}
        placeholder="pronouns"
        onChange={onFieldChange}
        ></input>
        <input 
        id="location"
        minLength={1}
        maxLength={100}
        name="location"
        value= {formField.campus}
        placeholder="city and state"
        onChange={onFieldChange}
        ></input>
        <input 
        id="className"
        minLength={1}
        maxLength={100}
        name="className"
        value= {formField.className}
        placeholder="class name"
        onChange={onFieldChange}
        ></input>
        <input 
        id="campus"
        minLength={1}
        maxLength={100}
        name="campus"
        value= {formField.campus}
        placeholder="campus"
        onChange={onFieldChange}
        ></input>
        <input 
        id="bio"
        minLength={1}
        maxLength={100}
        name="bio"
        value= {formField.bio}
        placeholder="bio"
        onChange={onFieldChange}
        ></input>
        <input type="submit" value="Submit" />
      </form>
  );
};
export default SignUpForm;