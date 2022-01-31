import Comment from './Comment';
import './Post.css';
import { Link } from 'react-router-dom';

const Post = (props) => {

  const renderComments = (props) => {
    const comments = props.comments
//  somehow get comments from post API call?
// for comment in props.comments, create post component
// how to return all comments?
  return (
    <div className="comments" >
    
    </div>
  )
};
  return (
    <div className='post'>
      {/* link to profile of author */}
      <Link to="/profile">{props.username}</Link> 
      <h4>post title</h4>
      <p>post text</p>
      <div className='comment-section'>
        {/* need to render all comments here */}
      </div>
    </div>
  );
};

export default Post;