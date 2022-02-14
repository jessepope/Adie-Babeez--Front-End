import "./ProfilePage.css";
import NavBar from "../components/NavBar";
import AppContext from "../AppContext";
import FooterEachPage from "../components/FooterEachPage";
import Post from "../components/Post";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ProfilePage = (props) => {
  // STATE VARIABLES
  const myContext = useContext(AppContext);
  const userId = myContext.userVariable.user_id;
  const [userInfo, setUserInfo] = useState({});
  const { register, handleSubmit, reset } = useForm({
    defaultValues: userInfo,
  });
  const navigate = useNavigate();
  const location = useLocation();

  // check if current user is self
  const { user } = location.state;
  const [userSelf, setUserSelf] = useState(false);

  // form error message rendering
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [editProfileStatus, setEditProfileStatus] = useState(false);

  // Initial Render
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${user}`)
      .then((response) => {
        setUserInfo(response.data);
        if (userId === parseInt(user)) {
          setUserSelf(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // DELETE USER
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

  const cancelDelete = () => {
    setDeleteMessage(null);
  };

  const deleteProfile = () => {
    setDeleteMessage(
      <div id="delete-profile-message">
        <p className="error-message">
          {" "}
          Are you sure you want to delete your profile?{" "}
        </p>
        <div>
          <button className="button" onClick={confirmDeleteFunc}>
            {" "}
            Yes
          </button>
          <button className="button" onClick={cancelDelete}>
            {" "}
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // EDIT USER
  const onChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    reset(userInfo);
  }, [userInfo]);

  const editProfile = () => {
    setEditProfileStatus(true);
  };

  const cancelEditProfile = () => {
    setEditProfileStatus(false);
  };

  const editProfileSubmit = (e) => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");

    let validData = true;

    if (userInfo.username.length === 0) {
      username.style.borderColor = "red";
      setShowErrorMessage(true);
      validData = false;
    }
    if (userInfo.password.length === 0) {
      password.style.borderColor = "red";
      setShowErrorMessage(true);
      validData = false;
    }
    if (userInfo.email.length === 0) {
      email.style.borderColor = "red";
      setShowErrorMessage(true);
      validData = false;
    }

    if (validData === true) {
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${userId}`, [
          userInfo,
        ])
        .then((response) => {
          myContext.setCurrentUser(response.data);
          setEditProfileStatus(false);
          navigate(`/profile/${userId}`, {
            replace: true,
            state: { user: userId },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const profileButtons = (
    <div id="profile-buttons">
      {userSelf ? (
        <button className="button" onClick={editProfile}>
          Edit Profile
        </button>
      ) : null}
      {userSelf ? (
        <button className="button" onClick={deleteProfile}>
          Delete Profile
        </button>
      ) : null}
    </div>
  );

  const profileInfo = (
    <div id="profile-display">
      <div id="profile-info">
        <p id="user-email">username: {userInfo.username}</p>
        {userInfo.pronouns ? (
          <p id="user-pronouns">pronouns: {userInfo.pronouns}</p>
        ) : null}
        {userInfo.bio ? <p id="user-bio">bio: {userInfo.bio}</p> : null}
        <p id="user-name">email: {userInfo.email}</p>
        {userInfo.posts ? <p id="user-posts">posts: {userInfo.posts}</p> : null}
        {userInfo.campus ? (
          <p id="user-campus">campus: {userInfo.campus}</p>
        ) : null}
        {userInfo.location ? (
          <p id="user-bio">location: {userInfo.location}</p>
        ) : null}
        {userInfo.class_name ? (
          <p id="user-class-name">class name: {userInfo.class_name}</p>
        ) : null}
      </div>
      {deleteMessage ? deleteMessage : profileButtons}
    </div>
  );

  const profileEditForm = (
    <form id="edit-profile-form" onSubmit={handleSubmit(editProfileSubmit)}>
      <div className="error-message-container">
        {showErrorMessage ? (
          <p className="error-message">
            Username Email and Password are required.
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
          {...register("username", { required: true })}
          value={userInfo.username}
          onChange={onChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>email:</p>
        <input
          id="email"
          minLength={1}
          maxLength={80}
          name="email"
          {...register("email", { required: true })}
          value={userInfo.email}
          onChange={onChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>password:</p>
        <input
          id="password"
          minLength={1}
          maxLength={50}
          name="password"
          {...register("password", { required: true })}
          value={userInfo.password}
          onChange={onChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>pronouns:</p>
        <input
          id="pronouns"
          maxLength={50}
          name="pronouns"
          {...register("pronouns", { required: false })}
          value={userInfo.pronouns}
          onChange={onChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>location:</p>
        <input
          id="location"
          maxLength={50}
          name="location"
          {...register("location", { required: false })}
          value={userInfo.location}
          onChange={onChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>class name:</p>
        <input
          id="className"
          maxLength={50}
          name="className"
          {...register("className", { required: false })}
          value={userInfo.class_name}
          onChange={onChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>campus:</p>
        <input
          id="campus"
          maxLength={50}
          name="campus"
          {...register("campus", { required: false })}
          value={userInfo.campus}
          onChange={onChange}
        ></input>
      </div>
      <div className="edit-form-field">
        <p>bio:</p>
        <input
          id="bio"
          maxLength={50}
          name="bio"
          {...register("bio", { required: false })}
          value={userInfo.bio}
          onChange={onChange}
        ></input>
      </div>
      <div id="edit-form-buttons">
        <button className="button" id="save-edit-profile-button" type="submit">
          Save Profile
        </button>
        <button
          className="button"
          id="cancel-edit-profile-button"
          onClick={cancelEditProfile}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  // COMPONENT RENDER
  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile-container">
        <div id="profile">
          {editProfileStatus ? profileEditForm : profileInfo}
        </div>
      </div>
      <FooterEachPage />
    </div>
  );
};

export default ProfilePage;
