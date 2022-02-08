import LoginForm from '../components/LoginForm'
import './LandingPage.css'

const LandingPage = (props) => {

    return (
        <div className="login-page">
            <div className='login-form-container'>
                <h1 className="title">Adie-Babeez</h1> 
                <h2 className="slogan">("A-dee-bay-beez")</h2>
                <h3 className="slogan">Connecting Adie Parents for all their parenting needs</h3>
                <LoginForm />
            </div>
        </div>
    );
};

export default LandingPage;