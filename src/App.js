import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Service Pages
import HomePage from "./service-pages/HomePage";
import QRScanner from "./service-pages/Scanner";
import Stream from "./service-pages/Stream";
import Service from "./service/service";

// Pages
import Auth from "./pages/home";
import GetStarted from "./pages/get-started";
import Home from "./pages/main";

// Modules
import English from "./pages/english";
import Math from "./pages/math";
import Science from "./pages/science";
import Quiz from "./pages/quiz";

// CSS
import './assets/css/default.css';
import './assets/css/pseudo.css';

import defaultMusic from './assets/audio/music.mp3';
import quizMusic from './assets/audio/music2.mp3';
import transitionSound from './assets/audio/transition.mp3'; 

// Component to manage routes and music logic
const RouterHandler = ({ playAudio, setCurrentMusic, audioRef }) => {
  const location = useLocation();
  const transitionAudioRef = useRef(new Audio(transitionSound));

  // Preload the transition sound
  useEffect(() => {
    transitionAudioRef.current.load();  // Preload the transition sound
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/quiz")) {
      setCurrentMusic(quizMusic);
    } else {
      setCurrentMusic(defaultMusic);
    }
  }, [location.pathname, setCurrentMusic]);

  useEffect(() => {
    // Play the page transition sound in advance (preload and then play immediately)
    transitionAudioRef.current.play().catch((err) => {
      console.error("Transition sound playback failed:", err);
    });
  }, [location.pathname]);  // Runs every time the route changes

  useEffect(() => {
    // Play updated music
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.load(); // Reload new music file
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  }, [audioRef]);

  return (
    <Routes>
      <Route path="/" element={<Auth playAudio={playAudio} />}></Route>
      <Route path="/get-started" element={<GetStarted />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/modules/english" element={<English />}></Route>
      <Route path="/modules/math" element={<Math />}></Route>
      <Route path="/modules/science" element={<Science />}></Route>
      <Route path="/quiz/:subject/:mode" element={<Quiz />}></Route>
    </Routes>
  );
};

const App = () => {
  const audioRef = useRef(null);
  const [currentMusic, setCurrentMusic] = useState(defaultMusic);

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  return (
    <Service service="">
      <audio ref={audioRef} src={currentMusic} loop autoPlay preload="auto">
        Your browser does not support the audio element.
      </audio>

      <BrowserRouter>
        <div className="bg">
          <RouterHandler
            playAudio={playAudio}
            setCurrentMusic={setCurrentMusic}
            audioRef={audioRef}
          />
        </div>
      </BrowserRouter>
    </Service>
  );
};

export default App;
