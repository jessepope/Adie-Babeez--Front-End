import { Link } from 'react-router-dom';
import './NavBar.css'
import AppContext from "../AppContext";
import { useContext } from 'react';

const NavBar = () => {
  const myContext = useContext(AppContext);
  const user_id = myContext.userVariable.user_id;

  return (

    <nav className='nav-container'>
        <div className='nav-item'>
          <Link className='nav-link' to={`/profile/${user_id}`} state={{ user: `${user_id}` }}>
          My Profile
          </Link>
        </div>
        <div className='nav-item'>
        <Link className='nav-link' to={`/inbox/${user_id}`} state={{ user: `${user_id}` }}>
          My Inbox
          </Link>
          </div>
        <div className='nav-item'><Link className='nav-link' to="/feed">Home</Link></div>
        <div className='nav-item'><Link className='nav-link' to="/newpost">New Post</Link></div>
    </nav>
  );
};


export default NavBar;