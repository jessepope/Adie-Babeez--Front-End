import "./HomePage.css";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";
import AppContext from "../AppContext";
import { useContext } from "react";


const HomePage = () => {
  const myContext= useContext(AppContext);
  console.log('user', myContext.userVariable)

  return (
    <div className='home-page'>
      <NavBar />
      <Feed />
    </div>
  );
};

export default HomePage;
