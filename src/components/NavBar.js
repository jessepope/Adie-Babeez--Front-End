import { Link } from 'react-router-dom';
import './NavBar.css'
import AppContext from "../AppContext";

const NavBar = () => {

  return (

    <nav className='nav-container'>
        <div className='nav-item'><Link className='nav-link' to="/profile" style={{ textDecoration: 'none' }}>My Profile</Link></div>
        <div className='nav-item'><Link className='nav-link' to="/feed" style={{ textDecoration: 'none' }}>Home</Link></div>
        <div className='nav-item'><Link className='nav-link' to="/newpost" style={{ textDecoration: 'none' }}>New Post</Link></div>
    </nav>

  );
};





export default NavBar;