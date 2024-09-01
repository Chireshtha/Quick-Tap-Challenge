import React, { useEffect, useState } from 'react';
import '../Styles/Styles.css';
import tapSound from '../assets/tap.wav';

function GameArea({ isPlaying, incrementScore }) {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [animate, setAnimate] = useState(false);
  const tapAudio = new Audio(tapSound);

  useEffect(() => {
    let moveInterval;
    if (isPlaying) {
      moveInterval = setInterval(moveTarget, 1000);
    }
    return () => clearInterval(moveInterval);
  }, [isPlaying]);

  const moveTarget = () => {
    const top = Math.random() * 90 + '%';
    const left = Math.random() * 90 + '%';
    setAnimate(false);
    setPosition({ top, left });
    setTimeout(() => setAnimate(true), 100);
  };

  const handleTargetClick = () => {
    incrementScore();
    tapAudio.play();
  };

  return (
    <main>
      <div className="background-animation"></div>
      <div id="game-area">
        {isPlaying && (
          <div
            id="target"
            className={animate ? 'animate' : ''}
            style={{ top: position.top, left: position.left }}
            onClick={handleTargetClick}
          ></div>
        )}
      </div>
    </main>
  );
}

export default GameArea;
