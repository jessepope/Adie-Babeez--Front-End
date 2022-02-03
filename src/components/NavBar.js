import { Link } from 'react-router-dom';
import './NavBar.css'
// import AppContext from "../AppContext";

const NavBar = () => {

  return (

    <nav className='nav-container'>
        <div className='nav-item'><Link className='nav-link' to="/profile">My Profile</Link></div>
        <div className='nav-item'><Link className='nav-link' to="/feed">Home</Link></div>
        <div className='nav-item'><Link className='nav-link' to="/newpost">New Post</Link></div>
    </nav>

  );
};





export default NavBar;