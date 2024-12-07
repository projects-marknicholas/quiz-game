import React from 'react';
import { useNavigate } from 'react-router';

// Components
import FadeIn from '../animations/fade-in';
import { motion } from 'framer-motion';

// CSS
import '../../assets/css/app.css';

const Description = ({ subject, title, description, onClose }) => {
  const navigate = useNavigate();
  
  const animationVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  const handlePlay = () =>{
    navigate(`/quiz/${subject}/${title}`);
  };

  return (
    <FadeIn>
      <div className="popup-overlay" onClick={onClose}>
        <motion.div
          className="popup-content"
          onClick={(e) => e.stopPropagation()}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className='title'>
            <h2>{subject} - {title}</h2>
          </div>
          <div className='description'>
            {description}
          </div>
          <div className="popup-actions">
            <button className="play-btn" onClick={handlePlay}>Play</button>
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      </div>
    </FadeIn>
  );
};

export default Description;
