import React from 'react';
import '../Styles/Styles.css';


function Header({ score, timeLeft }) {
  return (
    <header>
      <h1>Quick Tap Challenge</h1>
      <div className="scoreboard">
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
      </div>
    </header>
  );
}

export default Header;
