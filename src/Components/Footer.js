import React from 'react';
import '../Styles/Styles.css';

function Footer({ isPlaying, isPaused, startGame, pauseGame }) {
  return (
    <footer>
      {!isPlaying && <button onClick={startGame}>Start</button>}
      {isPlaying && <button onClick={pauseGame}>{isPaused ? 'Resume' : 'Pause'}</button>}
      {isPlaying && <button onClick={startGame}>Restart</button>}
    </footer>
  );
}

export default Footer;
