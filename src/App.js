import React, { useState, useEffect, useCallback } from 'react';
import Header from './Components/Header';
import GameArea from './Components/GameArea';
import Footer from './Components/Footer';
import './Styles/Styles.css';
import cheersSound from './assets/cheers.wav';
import bgSound from './assets/background-music.mp3';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [backgroundAudio] = useState(new Audio(bgSound));
  const [cheersAudio] = useState(new Audio(cheersSound));
  const [endGameMessage, setEndGameMessage] = useState('');

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    backgroundAudio.pause();
    cheersAudio.play();
    setEndGameMessage(`Game Over! Your score is ${score}`);
  }, [score, backgroundAudio, cheersAudio]);

  useEffect(() => {
    let timer;
    if (isPlaying && !isPaused && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, isPaused, timeLeft, endGame]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setIsPaused(false);
    setEndGameMessage('');
    backgroundAudio.play();
    backgroundAudio.loop = true;
  };

  const pauseGame = () => {
    setIsPaused((prev) => !prev);
    if (isPaused) {
      backgroundAudio.play();
    } else {
      backgroundAudio.pause();
    }
  };

  return (
    <div className="game-container">
      <Header score={score} timeLeft={timeLeft} />
      <GameArea isPlaying={isPlaying} incrementScore={() => setScore(score + 1)} />
      <Footer 
        isPlaying={isPlaying} 
        isPaused={isPaused} 
        startGame={startGame} 
        pauseGame={pauseGame} 
      />
      {endGameMessage && (
        <div className="end-game-overlay">
          <div className="end-game-message">{endGameMessage}</div>
        </div>
      )}
    </div>
  );
}

export default App;
