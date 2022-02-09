import "./ProfilePage.css";
import NavBar from "../components/NavBar";
import AppContext from "../AppContext";
import FooterEachPage from "../components/FooterEachPage"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ProfilePage = (props) => {
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
    username: "",
    email: "",
    password: "",
    pronouns: "",
    location: "",
    class_name: "",
    campus: "",
    bio: "",
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
      console.log('edit')
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
    <div id="profile- info">
      <p id="user-email">{userInfo.email}</p>
      <p id="user-pw">{userInfo.password}</p>
      <p id="user-name">{userInfo.username}</p>
      <p id="user-bio">{userInfo.bio}</p>
      <p id="user-post">{userInfo.posts}</p>
      <p id="user-campus">{userInfo.campus}</p>
      <p id="user-class-name">{userInfo.class_name}</p>
      <p id="user-pronouns">{userInfo.pronouns}</p>
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
      <input id="save-edit-profile-button" type="submit" value="Save Profile" />
    </form>;

  console.log('edit status', editProfileStatus)
  console.log('edit form', profileEditForm)
  console.lof('profileInfo', profileInfo)

  return (
    <div id="profile-page">
      <NavBar />
      <div className="profile-container">
        <div id="profile-buttons">
          <div> {deleteMessage ? deleteMessage : null}</div>
          <div id='edit-profile'>
            {userSelf ? <button className="button" onClick={editProfile}>Edit</button> : null}
          </div>
          <div id='delete-profile'>
            {userSelf ? <button className="button" onClick={deleteProfile}>DeleteProfile</button> : null}
          </div>
        </div>
        {editProfileStatus ? {profileEditForm} : {profileInfo}}
      </div>
      <FooterEachPage />
    </div>
  );
};

export default ProfilePage;
