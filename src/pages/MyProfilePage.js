import './MyProfilePage.css';
import NavBar from '../components/NavBar';

const MyProfilePage = (props) => {
// spread props to access user data and display in organized fashion on page
  return (
    <div className='my-profile-container'>
      <NavBar />
    </div>
  );
};

export default MyProfilePage;