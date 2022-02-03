import SignUpForm from "../components/SignUpForm";
import "./SignUpPage.css";
import AppContext from "../AppContext";

const SignUpPage = (props) => {
  return (
    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <SignUpForm UpdateCurrUser={props.UpdateCurrUser} />
      </div>
    </div>
  );
};

export default SignUpPage;
