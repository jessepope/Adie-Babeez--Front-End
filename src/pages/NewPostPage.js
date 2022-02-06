import "./NewPostPage.css";
import NewPostForm from "../components/NewPostForm";
import NavBar from "../components/NavBar";
import FooterEachPage from "../components/FooterEachPage";

const NewPostPage = (props) => {
  return (
    <div className="new-post-page">
      <NavBar />
      <NewPostForm />
      <FooterEachPage />
    </div>
  );
};

export default NewPostPage;
