import Post from "./Post";
import "./Feed.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

const Feed = () => {
  const myContext = useContext(AppContext);
  const user = myContext.userVariable;

  const [posts, setPosts] = useState([]);
  const [postComponents, setPostComponents] = useState([]);
  const [comments, setComments] = useState([]);
  
  const createPostsList = (info) => {
    let postList = info.map((post) => {
        return <Post
          onDeleteClick={deletePost}
          onLikeClick={likePost}
          user_id={post.user_id}
          title={post.title}
          text={post.text}
          onCommentDelete={deleteComment}
          post_id={post.id}
          // username={post.username}
        />
      });
      // potential place to sort/order post components
      return postList;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/all`)
      .then((response) => {
        // first thing you do with response.data is sort the posts by whatever criteria
        // but possibly it would be unordered before rendering bc its a dict
        setPosts(response.data);
        setPostComponents(createPostsList(response.data));
      });
  }, []);


  const deleteComment = (comment_id) => {
    const id = comment_id;
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`)
      .then(() => {
        const newComments = [];
        comments.forEach((comment) => {
          if (comment.id !== parseInt(id)) {
            newComments.push(comment);
          }
        });
        setComments(newComments);
      });
  };

    const likePost = (post_id) => {
      const id = post_id
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
          setPostComponents(newPosts);
        })
        .catch(() => {});
    };

    const deletePost = (post_id) => {
      const id = post_id;
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
          setPostComponents(newPosts);
        });
    };

  return (
    <div className="feed container">
      {/* before displaying post components, sort them but props (props.date_posted, props.campus) */}
      {postComponents ? postComponents.map((postComponent) => (postComponent)) : null}
    </div>
  );
};

export default Feed;
