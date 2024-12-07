import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// Components
import FadeIn from '../components/animations/fade-in';

// Assets
import Module1 from '../assets/img/module-1.png';
import Module2 from '../assets/img/module-2.png';
import Module3 from '../assets/img/module-3.png';

// CSS
import '../assets/css/app.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'App name';
  });

  const openModule1 = () => {
    navigate('/modules/english');
  };

  const openModule2 = () => {
    navigate('/modules/math');
  };

  const openModule3 = () => {
    navigate('/modules/science');
  };

  return(
    <FadeIn>
      <div className='home'>
        <nav>
          <div className='left'>
            <h2>Let's Play!</h2>
          </div>
          <div className='right'></div>
        </nav>

        <div className='modules'>
          <div className='module-data' onClick={openModule1}>
            <div className='module-info'>
              <span>Module 1</span>
              <h3>English</h3>
            </div>
            <div className='module-image'>
              <img src={Module1}/>
            </div>
          </div>

          <div className='module-data module-2' onClick={openModule2}>
            <div className='module-info'>
              <span>Module 2</span>
              <h3>Math</h3>
            </div>
            <div className='module-image'>
              <img src={Module2}/>
            </div>
          </div>

          <div className='module-data module-3' onClick={openModule3}>
            <div className='module-info'>
              <span>Module 3</span>
              <h3>Science</h3>
            </div>
            <div className='module-image'>
              <img src={Module3}/>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default Home;