import { Link } from 'react-router-dom';

const NavBar = (props) => {

  return (

  
    <nav>
      <div className='grid-container'>
        <div className='grid-item'><Link to="/profile" style={{ textDecoration: 'none' }}>My Profile</Link></div>
        <div className='grid-item'><Link to="/feed" style={{ textDecoration: 'none' }}>Home</Link></div>
        <div className='grid-item'><Link to="/newpost" style={{ textDecoration: 'none' }}>New Post</Link></div>
      </div>
    </nav>

    
      

  );
};





export default NavBar;