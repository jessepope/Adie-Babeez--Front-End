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
    console.log("user", user);
    console.log("props user", props.user_id);
    if (user_id === props.user_id) {
      deleteButton = (
        <button
          classname="Button"
          id="delete"
          onDeleteClick={() => props.deletePost(props.post_id)}
        >
          &#x274c;
        </button>
      );
    }
    return deleteButton;
  };

  let commentList = null;
  if (props.comments) {
    commentList = props.comments.map((comment) => {
      return (
        <Comment
          username={props.username}
          comment_id={comment.id}
          onClick={props.onCommentDelete}
        />
      );
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
    <div >
      <div>
        {props.username}
        {/* link to profile of user who made post */}
      </div>
      <div className="post-border">
      <div className="title2">{props.title}</div>
      <div className="text2">{props.text}</div>
      <div className="post-buttons">
        <button
          className="button"
          id="like-button"
          onLikeClick={() => props.LikePost(props.post_id)}
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
