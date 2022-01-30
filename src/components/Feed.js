import Post from './Post';
import './Feed.css';
import { Link } from 'react-router-dom';

// props will containe user info as currentUser={props.currentUser}
const Feed = (props) => {
  // make api call to get all posts with nested route to get all comments and then render posts into feed container
  const currentUser = props.currentUser;

  return (
  <div className="feed container">
    <Link to='/newpost'>New Post</Link>
    {/* need to render all posts here instead of just one */}
    <Post />
  </div>
  )
};

export default Feed;