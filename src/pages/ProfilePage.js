import "./ProfilePage.css";
import NavBar from "../components/NavBar";
import AppContext from "../AppContext";
import FooterEachPage from "../components/FooterEachPage"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ProfilePage = (props) => {
  const myContext = useContext(AppContext);
  console.log('user context', myContext.userVariable)

  const userId = myContext.userVariable.user_id;
  console.log('user_id', userId)
  const [userInfo, setUserInfo] = useState({})
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  console.log('user', user);

  const [userSelf, setUserSelf] = useState(false);
  let deleteMessage = null;
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
    const editProfile = () => {
      // we need to make inputs editable 
    }
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
    }
    const cancelDelete = ()=>{
      deleteMessage = null;
    }
    const deleteProfile = () => {
      deleteMessage= 
      <div>
        <p> Are you sure you want to delete your profile? </p>
        <div>
          <button onClick={confirmDeleteFunc}> Yes</button> 
          <button onClick={cancelDelete}> Cancel</button> 
        </div>
      </div>;
    return deleteMessage;

    }
  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile-container">
        <div className='edit-profile'>
          {userSelf ? <button className="button" onClick={editProfile}>Edit</button> : null}
        </div>
        <div className='delete-profile'>
          {userSelf ? <button className="button" onClick={deleteProfile}>DeleteProfile</button> : null}
        </div>
        <div> {deleteMessage ? deleteMessage : null}</div>
        <div className="user-email">{userInfo.email}</div>
        <div className="user-pw">{userInfo.password}</div>
        <div className="user-name">{userInfo.username}</div>
        <div className="user-bio">{userInfo.bio}</div>
        <div className="user-post">{userInfo.posts}</div>
        <div className="user-campus">{userInfo.campus}</div>
        <div className="user-class-name">{userInfo.class_name}</div>
        <div className="user-pronouns">{userInfo.pronouns}</div>
      </div>
      <FooterEachPage />
    </div>
  );
};

export default ProfilePage;
