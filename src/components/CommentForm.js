import AppContext from "../AppContext";
import React, { useState, useContext} from "react";
import axios from "axios";

const CommentForm = (props) => {
  const [commentText, setCommentText] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const myContext = useContext(AppContext);

  const onFieldChange = (e) => {
    setCommentText(e.target.value);
  };
  console.log('text', commentText)
  console.log('props', props)

  const onNewCommentFormSubmit = (e) => {
    e.preventDefault();
    const user = myContext.userVariable;
    const userId = user["user_id"];
    let requestBody = {};

    const text = document.getElementById("text");
    let validComment = true;
    console.log('text', commentText)

    if (commentText.length === 0) {
      console.log('here')
      text.style.borderColor = "red";
      setShowErrorMessage(true);
      validComment = false;
    }
    console.log(validComment)
    if (validComment === true) {
      requestBody["user_id"] = userId;
      requestBody["text"] = commentText;
      requestBody["post_id"] = props.post_id;
      console.log(requestBody)
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/comments/newcomment`, [requestBody])
        .then((response) => {

        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <form className="comment-form" onSubmit={onNewCommentFormSubmit}>
      <div className ='error-message-container'>
        {showErrorMessage ? <p className="error-message"> Error Message </p> : null}
      </div>
      <input
        id="text"
        minLength={1}
        maxLength={80}
        name="text"
        value={commentText}
        placeholder="Add a Comment..."
        onChange={onFieldChange}
      ></input>
      <input
        post_id={props.post_id}
        className="button"
        type="submit"
        value="Submit New Comment"
      />
      <input
        className="button"
        type="submit"
        value="Cancel"
        onClick={props.onCancel}
      />
    </form>
  );
};

export default CommentForm;
