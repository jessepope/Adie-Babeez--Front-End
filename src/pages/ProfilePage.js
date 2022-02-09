import "./ProfilePage.css";
import NavBar from "../components/NavBar";
import AppContext from "../AppContext";
import FooterEachPage from "../components/FooterEachPage"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ProfilePage = (props) => {
  // STATE VARIABLES
  const myContext = useContext(AppContext);
  const userId = myContext.userVariable.user_id;
  const [userInfo, setUserInfo] = useState({})
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [userSelf, setUserSelf] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [deleteMessage,setDeleteMessage] = useState(null);
  const [editProfileStatus, setEditProfileStatus] = useState(false);
  const [formField, setFormField] = useState({
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.email,
    pronouns: userInfo.email,
    location: userInfo.email,
    class_name: userInfo.email,
    campus: userInfo.email,
    bio: userInfo.email,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${user}`)
      .then((response) => {
        setUserInfo(response.data);
        if (userId === parseInt(user)) {
          setUserSelf(true)
        };
      })
      .catch((err)=>{
        console.log(err)
      });
    }, []);

    const confirmDeleteFunc = () => {
      axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${userId}`)
      .then(() => {
        myContext.setCurrentUser({});
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
    };

    const cancelDelete = ()=>{
      setDeleteMessage(null)
    }
    
    const deleteProfile = () => {
      setDeleteMessage( 
      <div>
        <p className="error-message"> Are you sure you want to delete your profile? </p>
        <div>
          <button className="button" onClick={confirmDeleteFunc}> Yes</button> 
          <button className="button" onClick={cancelDelete}> Cancel</button> 
        </div>
      </div>);
    }

    const onFieldChange = (e) => {
      setFormField({
        ...formField,
        [e.target.name]: e.target.value,
      });
    };

    const editProfile = () => {
      setEditProfileStatus(true);
    }

    const cancelEditProfile = () => {
      setEditProfileStatus(false);
    }

    const editProfileSubmit = (e) => {
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
      if (validData === true) {
      axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${userId}`, [formField])
      .then(() => {
        navigate(`/"/profile/${userId}"`);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    }

  const profileInfo =  
    <div id="profile-display">
      <div id="profile-info">
        <p id="user-email">username: {userInfo.email}</p>
        <p id="user-name">email: {userInfo.username}</p>
      {userInfo.bio ? <p id="user-bio">bio: {userInfo.bio}</p> : null}
        {userInfo.posts ? <p id="user-posts">posts: {userInfo.posts}</p> : null}
        {userInfo.campus ? <p id="user-campus">campus: {userInfo.campus}</p> : null}
        {userInfo.location ? <p id="user-bio">location: {userInfo.location}</p> : null}
        {userInfo.class_name ? <p id="user-class-name">class name: {userInfo.class_name}</p> : null}
        {userInfo.pronouns ? <p id="user-pronouns">pronouns: {userInfo.pronouns}</p> : null}
      </div>
      <div id="profile-buttons"> 
        {deleteMessage ? deleteMessage : null}
        {userSelf ? <button className="button" onClick={editProfile}>Edit Profile</button> : null}
        {userSelf ? <button className="button" onClick={deleteProfile}>Delete Profile</button> : null}
      </div>
    </div>;

  const profileEditForm = 
    <form id="edit-profile-form" onSubmit={editProfileSubmit}>
      <div className="error-message-container">
          {showErrorMessage ? (
            <p className="error-message">
              {" "}
              Username Email and Password are required.{" "}
            </p>
          ) : null}
      </div>
      <div className="edit-form-field">
        <p>username:</p>
        <input
          id="username"
          minLength={1}
          maxLength={80}
          name="username"
          value={formField.username}
          placeholder={userInfo.username}
          onChange={onFieldChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>email:</p>
        <input
          id="email"
          minLength={1}
          maxLength={80}
          name="email"
          value={formField.email}
          placeholder={userInfo.email}
          onChange={onFieldChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>password:</p>
        <input
          id="password"
          minLength={1}
          maxLength={50}
          name="password"
          value={formField.password}
          placeholder="password"
          onChange={onFieldChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>pronouns:</p>
        <input
          id="pronouns"
          maxLength={50}
          name="pronouns"
          value={formField.pronouns}
          placeholder={userInfo.pronouns ? userInfo.pronouns : "pronouns"}
          onChange={onFieldChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>location:</p>
        <input
          id="location"
          maxLength={50}
          name="location"
          value={formField.location}
          placeholder= {userInfo.location ? userInfo.location : "location"}
          onChange={onFieldChange}
        ></input>
      </div>
      <div className="edit-form-field">
      <p>class name:</p>
      <input
        id="className"
        maxLength={50}
        name="className"
        value={formField.className}
        placeholder={userInfo.class_name ? userInfo.class_name : "class name"}
        onChange={onFieldChange}
      ></input>
      </div>
      <div className="edit-form-field">
        <p>campus:</p>
        <input
          id="campus"
          maxLength={50}
          name="campus"
          value={formField.campus}
          placeholder={userInfo.campus ? userInfo.campus : "campus"}
          onChange={onFieldChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>bio:</p>
        <input
          id="bio"
          maxLength={50}
          name="bio"
          value={formField.bio}
          placeholder={userInfo.bio ? userInfo.bio : "bio"}
          onChange={onFieldChange}
        ></input>
      </div>
      <div id="edit-form-buttons">
        <button className="button" id="save-edit-profile-button" type="submit">Save Profile</button>
        <button className="button" id="cancel-edit-profile-button" onClick={cancelEditProfile}>Cancel</button>
      </div>
    </form>;

  return (
    <div id="profile-page">
      <NavBar />
      <div className="profile-container">
        <div id="profile">
          {editProfileStatus ? profileEditForm : profileInfo}
        </div>
      </div>
        {/* <div id="profile-buttons">
          <div> {deleteMessage ? deleteMessage : null}</div>
            {userSelf ? <button className="button" onClick={editProfile}>Edit Profile</button> : null}
            {userSelf ? <button className="button" onClick={deleteProfile}>Delete Profile</button> : null}
          </div>
      </div> */}
      <FooterEachPage />
    </div>
  );
};

export default ProfilePage;
