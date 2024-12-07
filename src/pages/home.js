import { useNavigate } from 'react-router';

// Components
import FadeIn from '../components/animations/fade-in';

// CSS
import '../assets/css/app.css';

const Auth = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/get-started');
  };

  return(
    <FadeIn>
      <div className="introduction">
        <div className="app-info">
          
        </div>
        <div className="app-start">
          <button onClick={handleNavigate}>Let's Play</button>
        </div>
      </div>
    </FadeIn>
  );
}

export default Auth;