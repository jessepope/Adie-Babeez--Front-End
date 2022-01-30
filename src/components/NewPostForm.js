import './NewPostForm.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPostForm = (props) => {
  const [formField, setFormField] = useState({ title: "", text: "" })
  let navigate = useNavigate();
  
  const onTitleChange = (e) => {
    setFormField({
      ...formField,
      title: e.target.value
    });
  };

  const onTextChange = (e) => {
    setFormField({
      ...formField,
      text: e.target.value
    });
  };

  const onNewPostFormSubmit = (e) => {
    e.preventDefault();
    
    /*We are going into the DOM taking specific element which is the GET element by ID we wew taking that element and bringing it into our function as a local varible so we can do things with it.*/
    const title = document.getElementById('posTitle');
    const text = document.getElementById('text');

    let validTitle = true;
    let validText = true;
    if (formField.title.length ===0 || formField.title.length > 50) {
      /*ADD CSS FOR THE BORDER TO TURN IT RED MAKE A CSS ID TAG FOR THE BOX*/
      // potentially add char limit into jsx element so we dont have to have condition logic for too large of an input
      title.style.borderColor= 'red'; 
      validTitle = false;
    }; 
    if (formField.text.length ===0 || formField.text.length > 50) {
      /*ADD CSS FOR THE BORDER TO TURN IT RED MAKE A CSS ID TAG FOR THE BOX*/
      text.style.borderColor= 'red';
      validText = false; 
    };

    if (validTitle === true && validText === true) {axios
      // how do we make sure to send user data with new post so API call makes a new post with user, send props?
    .post(`${process.env.REACT_APP_BACKEND_URL}/newpost`, formField, props)
    .then((response) => {
      if (response.status !== 200) {
        // give error messgae, stay on post page
      } else {
        // props.updateCurrUser(response.data)
        // give success message
        
      }
      setFormField({
        userInfo: "",
        password: "",
      });
      // how to we ensure new API call every time user navigates to feed?
      navigate(`/feed`);
    })  
    /*possibly adding logic*/
    .catch((err) => {
      console.log(err);
    });  
  }};


  return (
    <div className='new-post-container'>
      <form className="new-post-form" onSubmit={onNewPostFormSubmit}>
        <input 
        id="postTitle"
        minLength={1}
        maxLength={80}
        name="postTitle"
        value= {formField.title}
        placeholder="post title" 
        onChange={onTitleChange}
        ></input>
        <input 
        id="text"
        minLength={1}
        maxLength={100}
        name="text"
        value= {formField.text}
        placeholder="post text"
        onChange={onTextChange}
        ></input>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default NewPostForm;