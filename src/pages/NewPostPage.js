import "./NewPostPage.css";
import NewPostForm from "../components/NewPostForm";
import NavBar from "../components/NavBar";

const NewPostPage = (props) => {
  return (
    <div className="new-post-age">
      <NavBar />
      <NewPostForm />
    </div>
  );
};

export default NewPostPage;
