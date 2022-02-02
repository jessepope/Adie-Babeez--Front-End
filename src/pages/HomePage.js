import "./HomePage.css";
import NavBar from "../components/NavBar";
import Feed from "../components/Feed";

// use global currentUser to load user data
// navbar
// render feed
// make post
// edit post
// comment
const HomePage = (props) => {
  return (
    <div className='grid-container'>
      <NavBar currentUser={props.currentUser} />
      <Feed currentUser={props.currentUser} />
    </div>
  );
};

export default HomePage;
