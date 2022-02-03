import './ProfilePage.css';
import NavBar from '../components/NavBar';
import AppContext from "../AppContext";

const ProfilePage = (props) => {
  console.log(props)
  return (
    <div className='my-profile-container'>
      <NavBar />
    </div>
  );
};

export default ProfilePage;