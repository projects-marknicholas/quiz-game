import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Components
import FadeIn from '../components/animations/fade-in';
import Description from '../components/pop/description';

// Assets
import LevelImage from '../assets/img/level.png';

// CSS
import '../assets/css/app.css';

const Math = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', description: '' });
  const [scores, setScores] = useState({
    easy: '0/0',
    medium: '0/0',
    hard: '0/0',
  });

  useEffect(() => {
    document.title = 'Math';

    // Get scores from localStorage and update the state
    const storedScores = JSON.parse(localStorage.getItem('scores')) || {};
    const mathScores = storedScores.math || {};

    // Check for 'not_taken' and replace it with '0/0'
    setScores({
      easy: mathScores.easy === 'not_taken' ? '0/0' : mathScores.easy || '0/0',
      medium: mathScores.medium === 'not_taken' ? '0/0' : mathScores.medium || '0/0',
      hard: mathScores.hard === 'not_taken' ? '0/0' : mathScores.hard || '0/0',
    });
  }, []);

  const handlePopupOpen = (title, description) => {
    setPopupData({ title, description });
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePlay = () => {
    alert('Playing...');
    handlePopupClose();
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <FadeIn>
      <div className='category-sub'>
        <div className="header-handle">
          <button onClick={handleReturn}>Return</button>
        </div>
        <div className="category-levels">
          <div
            className="item"
            onClick={() =>
              handlePopupOpen('easy', 'This is an easy level.')
            }
          >
            <img src={LevelImage} alt="Easy Level" />
            <h1>Easy {scores.easy}</h1>
          </div>
          <div
            className="item"
            onClick={() =>
              handlePopupOpen('medium', 'This is a medium level.')
            }
          >
            <img src={LevelImage} alt="Medium Level" />
            <h1>Medium {scores.medium}</h1>
          </div>
          <div
            className="item"
            onClick={() =>
              handlePopupOpen('hard', 'This is a hard level.')
            }
          >
            <img src={LevelImage} alt="Hard Level" />
            <h1>Hard {scores.hard}</h1>
          </div>
        </div>
      </div>
      {showPopup && (
        <Description
          subject='math'
          title={popupData.title}
          description={popupData.description}
          onClose={handlePopupClose}
          onPlay={handlePlay}
        />
      )}
    </FadeIn>
  );
};

export default Math;
