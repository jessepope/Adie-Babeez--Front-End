import './Comment.css';
import { Link } from 'react-router-dom';
import AppContext from "../AppContext";

const Comment = (props) => {
  console.log('comment props', props)
  return (
    <div className="comment">
      <div className="comment-auth">{props.username}{/* link to profile of author */}</div>
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