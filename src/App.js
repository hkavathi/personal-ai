import React, { useState, useEffect } from 'react';
import { FaHome, FaRobot, FaFileAlt } from 'react-icons/fa';
import Home from './components/Home';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [isChatting, setIsChatting] = useState(false);
  const [currentText, setCurrentText] = useState("I'm Software Developer");
  const texts = ["I'm Software Developer", "I'm Data Scientist", "I'm Technology Consultant"];

  useEffect(() => {
    let textIndex = 0;
    const changeText = () => {
      setCurrentText(texts[textIndex]);
      textIndex = (textIndex + 1) % texts.length;
    };
    const intervalId = setInterval(changeText, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const startChat = () => {
    document.querySelector('.home-background').classList.add('slide-out');
    setTimeout(() => {
      setIsChatting(true);
      document.body.classList.add('chatting-background');
      document.body.classList.remove('home-background');
    }, 500);
  };

  const stopChat = () => {
    setIsChatting(false);
    document.body.classList.remove('chatting-background');
    document.body.classList.add('home-background');
  };

  return (
    <div className="App">
      {!isChatting ? (
        <Home startChat={startChat} />
      ) : (
        <Chat onExitChat={stopChat} />
      )}
      <div className="main-buttons">
        <button className="home-btn" onClick={() => setIsChatting(false)}>
          <FaHome /><span>Home</span>
        </button>
        <button className="start-chat-btn" onClick={startChat}>
          <FaRobot /><span>Chat about me with AI</span>
        </button>
        <button className="download-resume-btn" onClick={() => window.open('${process.env.PUBLIC_URL}/Harshit_resume.pdf', '_blank')}>
          <FaFileAlt /><span>Download my resume</span>
        </button>
      </div>
    </div>
  );
}

export default App;