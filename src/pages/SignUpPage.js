import SignUpForm from '../components/SignUpForm';
import './SignUpPage.css';

const SignUpPage = (props) => {
    return (

        <div className="sign-up-page">
            <h1 className="title"></h1> 
            <h3 className="subtitle"></h3>
            <div className='sign-up-form-container'>
                <SignUpForm UpdateCurrUser={props.UpdateCurrUser} />
            </div>
        </div>
    );
};

export default LoginPage;