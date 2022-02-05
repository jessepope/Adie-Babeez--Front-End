import './Comment.css';
import { Link } from 'react-router-dom';
import AppContext from "../AppContext";
import { useContext } from 'react';

const Comment = (props) => {
  console.log('comment props', props)
  const myContext = useContext(AppContext);

  return (
    <div className="comment">
      <div className="comment-auth">
        <Link className='profile-link' to={`/profile/${myContext.userVariable.user_id}`}>{myContext.userVariable.username}
        </Link>
      </div>
      <div className="text">{props.text}</div>
      <div className="comment-buttons">
        <button className="delete" onClick={() => props.deleteComment(props.comment_id)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Comment;