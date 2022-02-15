import SignUpForm from "../components/SignUpForm";
import "./SignUpPage.css";
import FooterEachPage from "../components/FooterEachPage"

const SignUpPage = (props) => {
  return (
    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
