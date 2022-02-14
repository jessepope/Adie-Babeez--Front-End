import Post from "./Post";
// import Comment from "./Comment"
import "./Feed.css";
// import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const Feed = () => {
  // STATE VARIABLES
  const myContext = useContext(AppContext);
  const user = myContext.userVariable;

  const [posts, setPosts] = useState([]);
  const [postComponents, setPostComponents] = useState([]);

  // INITIAL RENDER
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/all`)
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

  // POSTS
  useEffect(() => {
    const likePost = (post_id) => {
      const id = post_id;
      axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`)
        .then(() => {
          const newPosts = posts.map((post) => {
            if (post.post_id === parseInt(id)) {
              post.likes += 1;
            }
            return post;
          });
          setPosts(newPosts);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const deletePost = (e) => {
      const id = e.post_id;
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`)
        .then(() => {
          const newPosts = [];
          posts.forEach((post) => {
            if (post.post_id !== parseInt(id)) {
              newPosts.push(post);
            }
          });
          setPosts(newPosts);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (posts) {
      const postComponents = posts.map((post) => {
        return (
          <Post
            key={post.post_id}
            onDeleteClick={deletePost}
            onLikeClick={likePost}
            user_id={post.user_id}
            title={post.title}
            text={post.text}
            post_id={post.post_id}
            username={post.username}
            likes={post.likes}
            comments = {post.comments}
          />
        );
      });
      setPostComponents(postComponents);
    }
  }, [posts]);

  // COMPONENT RENDER
  return (
    <div className="feed-container">
      {postComponents ? postComponents : null}
    </div>
  );
};

export default Feed;
