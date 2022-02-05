import './ProfilePage.css';
import NavBar from '../components/NavBar';
import AppContext from "../AppContext";
import FooterEachPage from "../components/FooterEachPage"

const ProfilePage = () => {
  return (
    <div className='profile-page'>
      <NavBar />
      <FooterEachPage />
    </div>
  );
};

export default ProfilePage;