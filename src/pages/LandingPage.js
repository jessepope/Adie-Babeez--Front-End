import LoginForm from '../components/LoginForm'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {

    let navigate = useNavigate();

    const onSignUpClick = (e) => {
        navigate(`/signup`);
    }
    return (

        <div className="login-page">
            <h1 className="title">Adie-Babeez</h1> 
            <h2 className="slogan">(A-dee-bay-beez)</h2>
            <h3 className="slogan">Connecting Adie Parents for all their parenting needs</h3>
            <div className='login-form-container'>
                <LoginForm UpdateCurrUser={props.updateCurrUser} />
                <button id='sign-up-button' onClick={onSignUpClick}>Sign Up</button>
            </div>
        </div>
    );
};

export default LandingPage;