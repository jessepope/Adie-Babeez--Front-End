import './Comment.css';
import { Link } from 'react-router-dom';
import AppContext from "../AppContext";
import { useContext } from 'react';

const Comment = (props) => {
  // STATE VARIABLES
  const myContext = useContext(AppContext);
  const user = myContext.userVariable;
  const user_id = user.user_id;

  // CHECK IF USER IS SELF
  const checkUser = (props) => {
    let deleteButton = null;
    if (user_id === props.user_id) {
      deleteButton = (
        <button
          className="button"
          id="delete"
          onClick={() => props.onDeleteClick(props.comment_id)}
        >&#10062;
        </button>
      );
    }
    return deleteButton;
  };
  
  return (
    <div className="comment">
      <div className="comment-user">
        <Link className='profile-link' to={`/profile/${props.username}`} state={{ user: `${props.user_id}` }}>{props.username}
        </Link>
      </div>
      <div className="text">{props.text}</div>
      <div className="comment-buttons">
      {checkUser(props)}
      </div>
    </div>
  );
};

export default Comment;