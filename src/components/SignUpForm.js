import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpForm.css";
import AppContext from "../AppContext";

function SignUpForm(props) {
  let navigate = useNavigate();
  // STATE VARIABLES
  const myContext = useContext(AppContext);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formField, setFormField] = useState({
    username: "",
    email: "",
    password: "",
    pronouns: "",
    location: "",
    class_name: "",
    campus: "",
    bio: "",
  });
  const [data, setData] = useState({});

  // FORM SUBMISSION
  const onFieldChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const onSignUpFormSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");

    let validData = true;

    if (formField.username.length === 0) {
      username.style.borderColor = "red";
      setShowErrorMessage(true);
      validData = false;
    }
    if (formField.password.length === 0) {
      password.style.borderColor = "red";
      setShowErrorMessage(true);
      validData = false;
    }
    if (formField.email.length === 0) {
      email.style.borderColor = "red";
      setShowErrorMessage(true);
      validData = false;
    }

    let env_key = process.env.REACT_APP_CHAT_ENGINE_KEY;
    let config = {
      headers: {
        "PRIVATE-KEY": env_key,
      },
    };

    if (validData === true) {
      // create user
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, [formField])
        .then((response) => {
          // create user in chat engine API
          console.log("api response", response.data);
          setData({
            username: response.data.username,
            secret: response.data.password,
            email: response.data.email,
          });
          console.log(data);
          axios
            .post("https://api.chatengine.io/users/", data, config)
            .then((response) => {
              console.log("successfully created a user on ChatEngine");
              const user_id_chatengine = response["id"];
              const request_body = { user_id_chatengine: user_id_chatengine };
              const user_id = myContext.userVariable.user_id;
              // update db user to include Chat Engine user id
              axios
                .put(
                  `${process.env.REACT_APP_BACKEND_URL}/users/profile/${user_id}`,
                  [request_body]
                )
                .then((response) => {
                  myContext.setCurrentUser(response.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              console.log("failed to create a user on ChatEngine");
            });
          myContext.setCurrentUser(response.data);
          navigate(`/feed`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form className="sign-up-form" onSubmit={onSignUpFormSubmit}>
      <div className="left-half">
        <h3 className="sign-up-title">Create a new Adie Babeez account</h3>
        <p className="sign-up-subt">
          Please complete the form below. Username, email, and password are
          required fields.
        </p>
        <div className="error-message-container">
          {showErrorMessage ? (
            <p className="error-message">
              {" "}
              Username Email and Password are required.{" "}
            </p>
          ) : null}
        </div>
        <div className="sign-up-inputs">
          <input
            id="username"
            minLength={1}
            maxLength={80}
            name="username"
            value={formField.username}
            placeholder="username"
            onChange={onFieldChange}
          ></input>{" "}
          <input
            id="email"
            minLength={1}
            maxLength={80}
            name="email"
            value={formField.email}
            placeholder="email"
            onChange={onFieldChange}
          ></input>{" "}
          <input
            id="password"
            minLength={1}
            maxLength={50}
            name="password"
            value={formField.password}
            placeholder="password"
            onChange={onFieldChange}
          ></input>{" "}
          <input
            id="pronouns"
            maxLength={50}
            name="pronouns"
            value={formField.pronouns}
            placeholder="pronouns"
            onChange={onFieldChange}
          ></input>{" "}
          <input
            id="location"
            maxLength={50}
            name="location"
            value={formField.location}
            placeholder="city and state"
            onChange={onFieldChange}
          ></input>{" "}
          <input
            id="className"
            maxLength={50}
            name="className"
            value={formField.className}
            placeholder="class name"
            onChange={onFieldChange}
          ></input>
          <input
            id="campus"
            maxLength={50}
            name="campus"
            value={formField.campus}
            placeholder="campus"
            onChange={onFieldChange}
          ></input>{" "}
          <input
            id="bio"
            maxLength={50}
            name="bio"
            value={formField.bio}
            placeholder="bio"
            onChange={onFieldChange}
          ></input>
          <input id="sign-up-button" type="submit" value="Submit" />
        </div>
      </div>
      {/* i think the industry standard way might be to put the img element here and then link the gummy bear image? */}
      <div className="right-half"></div>
    </form>
  );
}
export default SignUpForm;
