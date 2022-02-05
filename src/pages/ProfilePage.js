import "./ProfilePage.css";
import NavBar from "../components/NavBar";
import AppContext from "../AppContext";
import FooterEachPage from "../components/FooterEachPage"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProfilePage = (props) => {
  const myContext = useContext(AppContext);
  console.log('user context', myContext.userVariable)
  const userId = myContext.userVariable.user_id;
  console.log('user_id', userId)
  const [userInfo, setUserInfo] = useState({})
  const location = useLocation();
  const { user } = location.state;
  let showEditButton = false;
  console.log('user', user)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${user}`)
      .then((response) => {
        setUserInfo(response.data);
        if (userId === user) {
          showEditButton=true
        }; 
        console.log('insideUseEffect',showEditButton)
      })
      .catch((err)=>{
        console.log(err)
      });
    }, []);

  console.log(showEditButton)
  return (
    <div className="profile-page">

      <NavBar />
      <div className="profile-container">
        <div className='edit-profile'>
          {showEditButton === true ? <button className ="button" className="edit-button">Edit</button> : null}
          </div>
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
