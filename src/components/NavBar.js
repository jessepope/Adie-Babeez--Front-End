import { Link } from 'react-router-dom';
import './NavBar.css'
import AppContext from "../AppContext";
import { useContext } from 'react';

const NavBar = () => {
  const myContext = useContext(AppContext);
  const user = myContext.userVariable;

  return (

    <nav className='nav-container'>
        <div className='nav-item'>
          <Link className='nav-link' to={`/profile/${user.user_id}`} state={{ user: `${user.user_id}` }}>
          My Profile
          </Link>
        </div>
        <div className='nav-item'><Link className='nav-link' to="/feed">Home</Link></div>
        <div className='nav-item'><Link className='nav-link' to="/newpost">New Post</Link></div>
    </nav>
  );
};


export default NavBar;