import Post from "./Post";
import Comment from "./Comment";
import "./Feed.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const myContext = useContext(AppContext);
  const user = myContext.userVariable;
  const userId = user["user_id"];

  useEffect(() => {
    // API call to get all posts and comments through nested route?
    // conditional rendering (in Post?) of "delete" and "edit" buttons if user id of post matches curr user

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/all`)
      .then((response) => {
        setPosts(response.data.posts);
        setComments(response.data.posts.comments);
      });
  }, []);

  useEffect(() => {
    const likePost = (e) => {
      const id = e.target.parentNode.parentNode.getAttribute("id");
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}/like`)
        .then(() => {
          const newPosts = posts.map((post) => {
            if (post.id === parseInt(id)) {
              post.likes_count += 1;
            }
            return post;
          });
          setPosts(newPosts);
        })
        .catch(() => {});
    };

    const deletePost = (e) => {
      // unsure how to get post id, this is an example from Inspo Board
      const id = e.target.parentNode.parentNode.getAttribute("id");
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`)
        .then(() => {
          const newPosts = [];
          posts.forEach((post) => {
            if (post.id !== parseInt(id)) {
              newPosts.push(post);
            }
          });
          setPosts(newPosts);
        });
    };

    const deleteComment = (e) => {
      // unsure how to get comment id, this is an example from Inspo Board
      const id = e.target.parentNode.parentNode.getAttribute("id");
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`)
        .then(() => {
          const newComments = [];
          comments.forEach((comment) => {
            if (comment.id !== parseInt(id)) {
              newComments.push(comment);
            }
          });
          setPosts(newComments);
        });
    };
    if (comments) {
      const commentList = comments.map((comment) => {
        return <Comment onClick={deleteComment} />;
      });
      setComments(commentList);
    }
  }, [posts, comments]);

  //  somehow get comments from post API call?
  // how to return all comments? not sure where to put this

  return (
    <div className="feed container">
      <p>This is the feed container</p>
      {/* render all posts here using post state variable and Post component */}
      {/* need to render Post to pass like and delete functions into Post component */}
    </div>
  );
};

export default Feed;
