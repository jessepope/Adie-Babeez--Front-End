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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/all`)
      .then((response) => {
        console.log("response", response.data);
        setPosts(response.data);
        // setPostComponents(createPostsList(response.data));
        console.log("posts", posts);
        console.log("components", postComponents);
      });
  }, []);

  // const createPosts = (data) => {
  //   console.log('data', data)
  //   let postsList = []
  //   data.forEach((post) => {
  //     postsList.push(post)
  //   });
  //   console.log('postsList', postsList)
  //   return postsList;
  // }

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/posts/all`)
  //     .then((response) => {
  //       console.log('responseresponse.data)
  //       setPosts(response.data);
  //       setPostComponents(createPostsList(response.data));
  //       console.log('first posts', posts)
  //     });
  // }, []);

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const likePost = (post_id) => {
      const id = post_id;
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
          console.log("newPosts", newPosts);
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
            onCommentDelete={deleteComment}
            post_id={post.post_id}
            username={post.username}
            likes_count={post.likes}
          />
        );
      });
      setPostComponents(postComponents);
    }
  }, [posts]);

  return (
    <div className="feed-container">
      {/* before displaying post components, sort them but props (props.date_posted, props.campus) */}
      {/* {postComponents ? postComponents.map((postComponent) => (postComponent)) : null} */}
      {postComponents}
    </div>
  );
};

export default Feed;
