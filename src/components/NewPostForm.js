import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewPostForm.css";
import AppContext from "../AppContext"

function NewPostForm(props) {
  const [formField, setFormField] = useState({ title: "", text: "" });
  const [successMessage, setSuccessMessage] = useState(false);
  let navigate = useNavigate();
  const myContext = useContext(AppContext);

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

    // put char limit on element, then we can remove check for over 50
    if (formField.title.length === 0 || formField.title.length > 50) {
    title.style.borderColor = "red";
      validTitle = false;
    }
    if (formField.text.length === 0 || formField.text.length > 50) {
      text.style.borderColor = "red";
      validText = false;
    }

    if (validTitle === true && validText=== true) {
      formField["user_id"] = userId;
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/posts/newpost`, [formField])
        .then((response) => {
          setSuccessMessage(true);
          // time out
          navigate(`/feed`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let successfulPost = null;
  if (successMessage === true) {
    successfulPost = <h3>successful post</h3>
  };




  return (
    <div>
      <form className="new-post-form" onSubmit={onNewPostFormSubmit}>
        <div className="success-message">{successfulPost}</div>
        <input
          id="title"
          minLength={1}
          maxLength={80}
          name="title"
          value={formField.title}
          placeholder="title"
          onChange={onFieldChange}
        ></input>
        <input
          id="text"
          minLength={1}
          maxLength={100}
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
