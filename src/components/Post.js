import Comment from './Comment';
import './Post.css';
import { Link } from 'react-router-dom';

const Post = (props) => {

  return (
    <div className='post'>
      {/* link to profile of author */}
      <Link to="/myprofile">{props.user_id}</Link> 
      <h4>post title</h4>
      <p>post text</p>
      <div className='comment-section'>
        <Comment />
      </div>
    </div>
  );
};

export default Post;