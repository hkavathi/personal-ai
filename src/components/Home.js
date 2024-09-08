import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';

function Home({ startChat }) {
  return (
    <div className="home-background">
      <div class="overlay"></div>
      <div className="home-content">
        <h1>Harshit Kavathia</h1>
        <p>Welcome to my AI portfolio</p>
        <div className="dynamic-text">
          <ReactTyped
            strings={[
              "I'm Software Developer",
              "I'm Data Scientist",
              "I'm Data Engineer",
              "I'm Technology Consultant"
            ]}
            typeSpeed={50}
            backSpeed={50}
            loop
          />
        </div>
        <div className="social-buttons">
          <a href="https://www.linkedin.com/in/harshitkavathia266" target="_blank" rel="noopener noreferrer">
            <button className="social-btn linkedin-btn">
              <FaLinkedin /><span>LinkedIn</span>
            </button>
          </a>
          <a href="https://github.com/hkavathi?tab=repositories" target="_blank" rel="noopener noreferrer">
            <button className="social-btn github-btn">
              <FaGithub /><span>GitHub</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
