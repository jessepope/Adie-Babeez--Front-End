import "./HomePage.css";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";
import AppContext from "../AppContext";
import { useContext } from "react";
import FooterEachPage from "../components/FooterEachPage";

const HomePage = () => {
  const myContext= useContext(AppContext);
  console.log('HomePage',myContext.userVariable);

  return (
    <div className='home-page'>
      <NavBar />
      <Feed />
      <FooterEachPage />
    </div>
  );
};

export default HomePage;
