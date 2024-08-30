import React, { useEffect, useState } from 'react';
import '../Styles/Styles.css';

function GameArea({ isPlaying, incrementScore }) {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [animate, setAnimate] = useState(false);

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
    setAnimate(false);  // Reset animation
    setPosition({ top, left });
    setTimeout(() => setAnimate(true), 100);  // Trigger animation
  };

  return (
    <main>
      <div className="background-animation"></div> {/* Background Animation */}
      <div id="game-area">
        {isPlaying && (
          <div
            id="target"
            className={animate ? 'animate' : ''}
            style={{ top: position.top, left: position.left }}
            onClick={incrementScore}
          ></div>
        )}
      </div>
    </main>
  );
}

export default GameArea;

