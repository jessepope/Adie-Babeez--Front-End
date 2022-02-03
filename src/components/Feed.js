import Post from './Post';
import './Feed.css';
import { Link } from 'react-router-dom';
import AppContext from "../AppContext";

// props will containe user info as currentUser={props.currentUser}
const Feed = (props) => {
  // make api call to get all posts with nested route to get all comments and then render posts into feed container
  const currentUser = props.currentUser;

const renderPosts = (props) => {
//  API call to render all posts
// for post in props.posts, create post component
// how to return all posts?
  return (
    <div className="posts" >
    
    </div>
  )
};

  return (
  <div className="feed container">
    <p>This is the feed container</p>
  </div>
  )
};

export default Feed;