import "./ProfilePage.css";
import NavBar from "../components/NavBar";
import AppContext from "../AppContext";
import FooterEachPage from "../components/FooterEachPage"
import { useContext, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProfilePage = (props) => {
  const myContext = useContext(AppContext);
  const userId = myContext.userVariable;

  const location = useLocation();
  const { user } = location.state;
  console.log("user", user);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${user}`)
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  return (
    <div className="profile-page">
      <NavBar />
      <FooterEachPage />
    </div>
  );
};

export default ProfilePage;
