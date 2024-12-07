import React, { useState, useEffect } from 'react';

// Components
import FadeIn from '../components/animations/fade-in';
import Description from '../components/pop/description';

// Assets
import LevelImage from '../assets/img/level.png';

// CSS
import '../assets/css/app.css';

const Science = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ title: '', description: '' });

  useEffect(() => {
    document.title = 'Science';
  });

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

  return (
    <FadeIn>
      <div className='category-sub'>
        <div className="category-levels">
          <div 
            className="item" 
            onClick={() => handlePopupOpen(
              'easy', 
              'This is an easy level.'
            )}
          >
            <img src={LevelImage} alt="Easy Level" />
            <h1>Easy</h1>
          </div>
          <div 
            className="item" 
            onClick={() => handlePopupOpen(
              'medium', 
              'This is a medium level.'
            )}>
            <img src={LevelImage} alt="Medium Level" />
            <h1>Medium</h1>
          </div>
          <div 
            className="item" 
            onClick={() => handlePopupOpen(
              'hard', 
              'This is a hard level.'
            )}>
            <img src={LevelImage} alt="Hard Level" />
            <h1>Hard</h1>
          </div>
        </div>
      </div>
      {showPopup && (
        <Description
          subject='science'
          title={popupData.title}
          description={popupData.description}
          onClose={handlePopupClose}
          onPlay={handlePlay}
        />
      )}
    </FadeIn>
  );
};

export default Science;