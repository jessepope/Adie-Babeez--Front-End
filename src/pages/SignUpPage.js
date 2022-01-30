import SignUpForm from "../components/SignUpForm";
import "./SignUpPage.css";
import NavBar from "../components/NavBar";

const SignUpPage = (props) => {
  return (
    <div className="sign-up-page">
      <NavBar />
      <h3 className="title">Create a new Adie Babeez account</h3>
      <p className="subtitle">
        Please complete the form below. Username, email, and password are
        required fields.
      </p>
      <div className="sign-up-form-container">
        <SignUpForm UpdateCurrUser={props.UpdateCurrUser} />
      </div>
    </div>
  );
};

export default SignUpPage;
