import Comment from "./Comment";
import "./Post.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";

const Post = (props) => {
  let commentList = null
  if (props.comments) {
    commentList = props.comments.map((comment) => {
      return <Comment comment_id={comment.id} onClick={props.onCommentDelete} />;
    });
  }

  return (
    <div className="post">
      <div className="post-auth">
        {props.author}
        {/* link to profile of author */}
      </div>
      <div className="text">{props.title}</div>
      <div className="text">{props.text}</div>
      <div className="comment-buttons">
        <button className="like" onLikeClick={props.LikePost}>
          delete
        </button>
        <button className="delete" onDeleteClick={props.deletePost}>
          delete
        </button>
      </div>
      <div className="comment-section">
        {commentList}
      </div>
    </div>
  );
};

export default Post;
