import './Comment.css';
import { Link } from 'react-router-dom';
import AppContext from "../AppContext";

const Comment = (props) => {

  return (
    <div className='comment'>
      {/* link to profile of author */}
      {/* need to access props from comment to see who made it */}
      <Link to="/profile">{props.user_id}</Link> 
      <p>comment text</p>
    </div>
  );
};

export default Comment;