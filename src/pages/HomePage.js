import "./HomePage.css";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";
import AppContext from "../AppContext";
import { useContext } from "react";
import FooterEachPage from "../components/FooterEachPage";

const HomePage = () => {
  const myContext = useContext(AppContext);

  return (
    <div className="home-page">
      <NavBar />
      <Feed />
      <div className="footer">
        <FooterEachPage />
      </div>
      
    </div>
  );
};

export default HomePage;
