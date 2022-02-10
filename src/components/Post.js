import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./Post.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

const Post = (props) => {
  // STATE VARIABLES
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState(props.comments);
  const [commentComponents, setCommentComponents] = useState([]);
  console.log(comments);
  console.log("commentComponents", commentComponents);
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
          id="delete-post-button"
          onClick={() => props.onDeleteClick(props)}
        ></button>
      );
    }
    return deleteButton;
  };

  // COMMENTS
  useEffect(() => {
    const deleteComment = (comment_id) => {
      const id = comment_id;
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`)
        .then(() => {
          const newComments = [];
          comments.forEach((comment) => {
            if (comment.comment_id !== parseInt(id)) {
              newComments.push(comment);
            }
          });
          setComments(newComments);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (comments) {
      const commentComponents = comments.map((comment) => {
        return (
          <Comment
            text={comment.text}
            key={comment.comment_id}
            username={comment.username}
            comment_id={comment.comment_id}
            onDeleteClick={deleteComment}
            user_id={comment.user_id}
          />
        );
      });

      setCommentComponents(commentComponents);
    }
  }, [comments]);

  // COMMENT FORM
  const submitCommentForm = () => {
    setShowCommentForm(true);
  };

  const onCancel = (e) => {
    setShowCommentForm(false);
  };

  let commentForm = null;
  if (showCommentForm === true) {
    commentForm = (
      <CommentForm
        post_id={props.post_id}
        onCancel={onCancel}
        setShowCommentForm={setShowCommentForm}
      />
    );
  }

  return (
    <div>
      <div className="post-border">
        <Link
          className="profile-link"
          to={`/profile/${props.user_id}`}
          state={{ user: `${props.user_id}` }}
        >
          {props.username}
        </Link>
        <div className="post-info">
          <div className="post-title">{props.title}</div>
          <div className="post-text">{props.text}</div>
          <div id="post-buttons">
            <div id="likes-count">{props.likes}</div>
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
        </div>
        {commentForm}
        <div className="comment-section">
          <p className="comment-section-hdr">Comments:</p>
          {commentComponents ? commentComponents : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
