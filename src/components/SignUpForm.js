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

    let validData = true

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
    
    if (validData === true) {
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, formField)
    .then((response) => {
      props.updateCurrUser(response.data)
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

        <div className="left-half">
        <h3  className="sign-up-title" >Create a new Adie Babeez account</h3>
      <p className="sign-up-subt">
        Please complete the form below. Username, email, and password are
        required fields.
      </p>
      <br></br>
        <input
          id="userName"
          minLength={1}
          maxLength={80}
          name="userName"
          value={formField.userName}
          placeholder="username"
          onChange={onFieldChange}
        ></input> <br></br>
        <input
          id="email"
          minLength={1}
          maxLength={80}
          name="email"
          value={formField.email}
          placeholder="email"
          onChange={onFieldChange}
        ></input> <br></br>
        <input
          id="password"
          minLength={1}
          maxLength={50}
          name="password"
          value={formField.password}
          placeholder="password"
          onChange={onFieldChange}
        ></input> <br></br>
        <input
          id="pronouns"
          maxLength={50}
          name="pronouns"
          value={formField.pronouns}
          placeholder="pronouns"
          onChange={onFieldChange}
        ></input>  <br></br>
        <input
          id="location"
          maxLength={50}
          name="location"
          value={formField.location}
          placeholder="city and state"
          onChange={onFieldChange}
        ></input>  <br></br>
        <input
          id="className"
          maxLength={50}
          name="className"
          value={formField.className}
          placeholder="class name"
          onChange={onFieldChange}
        ></input><br></br>
        <input
          id="campus"
          maxLength={50}
          name="campus"
          value={formField.campus}
          placeholder="campus"
          onChange={onFieldChange}
        ></input>  <br></br>
        <input
          id="bio"
          maxLength={50}
          name="bio"
          value={formField.bio}
          placeholder="bio"
          onChange={onFieldChange}
        ></input><br></br>
        <input type="submit" value="Submit" />
        </div>
        <div className="right-half"></div>
      </form>

      
  );
};
export default SignUpForm;