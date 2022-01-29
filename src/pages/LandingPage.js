import LoginForm from '../components/LoginForm'
import './LandingPage.css'

const LoginPage = (props) => {

    const onClick = (e) => {
        // route user to submit form page
    }
    return (

        <div className="login-page">
            <h1 className="title">Adie-Babeez</h1> 
            <h3 className="slogan">Connecting Adie Parents for all their parenting needs</h3>
            <div className='login-form-container'>
                <LoginForm UpdateCurrUser={props.UpdateCurrUser} />
                <button id='sign-up-button' onClick={onClick}>Sign Up</button>
            </div>
        </div>
    );
};

export default LandingPage;