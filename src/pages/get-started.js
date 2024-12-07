import { useNavigate } from 'react-router';

// Components
import FadeIn from '../components/animations/fade-in';

// CSS
import '../assets/css/app.css';

const GetStarted = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/home');
  };

  return(
    <FadeIn>
      <div className="introduction">
        <div className="app-started">
          {/* <div className="start-image">
            <img/>
          </div>
          <h3>Get started title</h3>
          <p>Get started title description here</p> */}
        </div>
        <div className="app-start">
          <button onClick={handleNavigate}>Get Started</button>
        </div>
      </div>
    </FadeIn>
  );
}

export default GetStarted;