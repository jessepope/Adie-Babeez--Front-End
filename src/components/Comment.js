import './Comment.css';
import { Link } from 'react-router-dom';

const Comment = (props) => {

  return (
    <div className='comment'>
      {/* link to profile of author */}
      <Link to="/myprofile">{props.user_id}</Link> 
      <p>comment text</p>
    </div>
  );
};

export default Comment;