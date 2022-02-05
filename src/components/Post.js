import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./Post.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useState, useContext } from "react";

const Post = (props) => {
  // state variable to indicate whether you can see the form or not
  const [showCommentForm, setShowCommentForm] = useState(false);

  const myContext = useContext(AppContext);
  const user = myContext.userVariable;
  const user_id = user["user_id"];

  const checkUser = (props) => {
    let deleteButton = null;
    if (user_id === props.user_id) {
      deleteButton = (
        <button
          className="Button"
          id="delete"
          onClick={() => props.onDeleteClick(props)}
        >
          &#x274c;
        </button>
      );
    }
    return deleteButton;
  };

  let commentList = null;
  if (props.comments) {
    commentList = [];
    props.comments.map((comment) => {
      commentList.push(
        <Comment
          key={comment.id}
          username={props.username}
          comment_id={comment.id}
          onClick={props.onCommentDelete}
        />
      );
      return commentList;
    });
  }

  // when comment button is clicked, display comment form
  const submitCommentForm = () => {
    setShowCommentForm(true);
  };
  // when cancel is clicked, hide comment form
  const onCancel = (e) => {
    setShowCommentForm(false);
  };

  // conditional rendering: can you see the form or not, this is a jsx element that is in the return body
  let commentForm = null;
  if (showCommentForm === true) {
    commentForm = <CommentForm post_id={props.post_id} onCancel={onCancel} />;
  }

  return (
    <div>
      <div className="post-border">
        <div>
          <Link className="profile-link" to={`/profile/${props.user_id}`} state={{ user: `${props.user_id}` }}>
            {props.username}
          </Link>
        </div>
        <div className="title2">{props.title}</div>
        <div className="text2">{props.text}</div>
        <div className="post-buttons">
          <div>{props.likes_count}</div>
          <button
            className="button"
            id="like-button"
            onClick={() => props.onLikeClick(props.post_id)}
          >
            &#129293;
          </button>
          <button
            className="button"
            id="comment-button"
            post_id={props.post_id}
            onClick={submitCommentForm}
          >
            &#128172;
          </button>
          {checkUser(props)}
        </div>
        {/* conditionally rendered variable: it will hold comment form or be null */}
        {commentForm}
        <div className="comment-section">
          {/* conditionally rendered variable: will hold comments if they exist or be null */}
          {commentList}
        </div>
      </div>
    </div>
  );
};

export default Post;
