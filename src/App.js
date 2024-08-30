import React, { useState, useEffect, useCallback } from 'react';
import Header from './Components/Header';
import GameArea from './Components/GameArea';
import Footer from './Components/Footer';
import './Styles/Styles.css';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    alert(`Game Over! Your score is ${score}`);
  }, [score]);

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
  };

  const pauseGame = () => {
    setIsPaused((prev) => !prev);
  };

  const incrementScore = () => {
    setScore((prev) => prev + 1);
  };

  return (
    <div className="game-container">
      <Header score={score} timeLeft={timeLeft} />
      <GameArea isPlaying={isPlaying} incrementScore={incrementScore} />
      <Footer 
        isPlaying={isPlaying} 
        isPaused={isPaused} 
        startGame={startGame} 
        pauseGame={pauseGame} 
      />
    </div>
  );
}

export default App;
