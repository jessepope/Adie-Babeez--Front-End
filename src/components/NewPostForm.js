import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewPostForm.css";
import AppContext from "../AppContext"

function NewPostForm(props) {
  // STATE VARIABLES
  const myContext = useContext(AppContext);
  const [formField, setFormField] = useState({ title: "", text: "" });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  let navigate = useNavigate();
  
  // FORM SUBMIT
  const onFieldChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const onNewPostFormSubmit = (e) => {
    e.preventDefault();
    const user = myContext.userVariable
    const userId = user["user_id"]

    const title = document.getElementById("title");
    const text = document.getElementById("text");

    let validTitle = true;
    let validText = true;

    
    if (formField.title.length === 0) {
      title.style.borderColor = "red";
      setShowErrorMessage(true);
      validTitle = false;
    }
    if (formField.text.length === 0) {
      text.style.borderColor = "red";
      setShowErrorMessage(true);
      validText = false;
    }

    if (validTitle === true && validText=== true) {
      formField["user_id"] = userId;
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/posts/newpost`, [formField])
        .then((response) => {
          navigate(`/feed`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form className="new-post-form" onSubmit={onNewPostFormSubmit}>
      <div className ='error-message-container'>
        {showErrorMessage ? <p className="error-message"> Title & Text are required. </p> : null}
      </div>
        <input
          id="title"
          minLength={1}
          maxLength={40}
          name="title"
          value={formField.title}
          placeholder="title"
          onChange={onFieldChange}
        ></input>
        <input
          id="text"
          minLength={1}
          maxLength={80}
          name="text"
          value={formField.text}
          placeholder="text"
          onChange={onFieldChange}
        ></input>
        <input className="button" type="submit" value="Submit New Post" />
      </form>
    </div>
  );
}
export default NewPostForm;
