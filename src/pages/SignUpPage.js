import SignUpForm from "../components/SignUpForm";
import "./SignUpPage.css";

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
