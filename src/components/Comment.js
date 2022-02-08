import './Comment.css';
import { Link } from 'react-router-dom';
import AppContext from "../AppContext";
import { useContext } from 'react';

const Comment = (props) => {
  console.log('comment props', props)
  const myContext = useContext(AppContext);
  const user = myContext.userVariable;
  const user_id = user.user_id;
  const checkUser = (props) => {
    let deleteButton = null;
    if (user_id === props.user_id) {
      deleteButton = (
        <button
          className="button"
          id="delete"
          onClick={() => props.onDeleteClick(props.comment_id)}
        >
          &#x274c;
        </button>
      );
    }
    return deleteButton;
  };
  return (
    <div className="comment">
      <div className="comment-auth">
        <Link className='profile-link' to={`/profile/${props.username}`} state={{ user: `${props.user_id}` }}>{props.username}
        </Link>
      </div>
      <div className="text">{props.text}</div>
      <div className="comment-buttons">
      {checkUser(props)}
        {/* <button className="delete" onClick={() => props.onDeleteComment(props.comment_id)}>
          delete
        </button> */}
      </div>
    </div>
  );
};

export default Comment;