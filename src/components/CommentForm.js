import AppContext from "../AppContext";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const CommentForm = (props) => {
  const [commentText, setCommentText] = useState("");
  const myContext = useContext(AppContext);

  const onFieldChange = (e) => {
    setCommentText(e.target.value);
  };

  const onNewCommentFormSubmit = (e) => {
    e.preventDefault();
    const user = myContext.userVariable;
    const userId = user["user_id"];
    let requestBody = {};

    const text = document.getElementById("text");
    const validComment = true;

    if (commentText.length === 0 || commentText.length > 50) {
      text.style.borderColor = "red";
      validComment = false;
    }

    if (validComment === true) {
      requestBody["user_id"] = userId;
      requestBody["comment_text"] = commentText;
      requestBody["post_id"] = props.post_id;

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/comment`, [requestBody])
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <form className="comment-form">
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
        onSubmit={onNewCommentFormSubmit}
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
