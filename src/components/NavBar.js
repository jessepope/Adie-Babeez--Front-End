import { Link } from 'react-router-dom';

const NavBar = (props) => {

  return (
    <nav className='nav-bar'>
      <Link to="/myprofile">My Profile</Link>
      <Link to="/feed">Home</Link>
    </nav>
  );
};

export default NavBar;