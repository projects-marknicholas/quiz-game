import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Service Pages
import HomePage from "./service-pages/HomePage";
import QRScanner from "./service-pages/Scanner";
import Stream from "./service-pages/Stream";

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

const App = () => {
  return (
    <BrowserRouter>
      <div className='bg'>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/get-started" element={<GetStarted />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/modules/english" element={<English />}></Route>
          <Route path="/modules/math" element={<Math />}></Route>
          <Route path="/modules/science" element={<Science />}></Route>
          <Route path="/quiz/:subject/:mode" element={<Quiz />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
