import React, { useEffect, useRef, useState } from 'react';
import { saveScore, getLeaderboard } from '../api/client';

const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

const GameBoard = ({ user }) => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const directionRef = useRef({ x: 0, y: 0 }); // Use ref for direction to avoid interval resets
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // Track if game has started
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    if (gameOver) {
      const finalScore = (snake.length - 1) * 10;
      if (user) {
        saveScore(user.username, finalScore).then(() => {
          getLeaderboard().then(setHighScores);
        });
      } else {
        getLeaderboard().then(setHighScores);
      }
    }
  }, [gameOver, snake.length, user]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          setSnake([{ x: 10, y: 10 }]);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
          setScore(0);
          setGameOver(false);
          setGameStarted(true);
          
          switch (e.key) {
            case 'ArrowUp': directionRef.current = { x: 0, y: -1 }; break;
            case 'ArrowDown': directionRef.current = { x: 0, y: 1 }; break;
            case 'ArrowLeft': directionRef.current = { x: -1, y: 0 }; break;
            case 'ArrowRight': directionRef.current = { x: 1, y: 0 }; break;
          }
        }
        return;
      }

      const currentDir = directionRef.current;
      switch (e.key) {
        case 'ArrowUp': 
          if (currentDir.y !== 1) {
             directionRef.current = { x: 0, y: -1 };
             setGameStarted(true);
          }
          break;
        case 'ArrowDown': 
          if (currentDir.y !== -1) {
            directionRef.current = { x: 0, y: 1 };
            setGameStarted(true);
          }
          break;
        case 'ArrowLeft': 
          if (currentDir.x !== 1) {
            directionRef.current = { x: -1, y: 0 };
            setGameStarted(true);
          }
          break;
        case 'ArrowRight': 
          if (currentDir.x !== -1) {
            directionRef.current = { x: 1, y: 0 };
            setGameStarted(true);
          }
          break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const direction = directionRef.current;
        
        // Don't move if direction is 0,0
        if (direction.x === 0 && direction.y === 0) return prevSnake;

        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [food, gameOver]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw Food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // Draw Snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
  }, [snake, food]);
  return (
    <div>
      <div style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Score: {score}</div>
      <canvas 
        ref={canvasRef} 
        width={CANVAS_SIZE} 
        height={CANVAS_SIZE} 
        style={{ border: '1px solid black', background: '#f0f0f0' }}
      />
      {!gameStarted && !gameOver && <div style={{ marginTop: '10px' }}>Press any arrow key to start!</div>}
      {gameOver && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ color: 'red', fontWeight: 'bold' }}>Game Over! Final Score: {score}</div>
          <div>Press any arrow key to restart.</div>
          {highScores.length > 0 && (
            <div style={{ marginTop: '15px', textAlign: 'left' }}>
              <h4>High Scores:</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {highScores.map((entry, i) => (
                  <li key={i} style={{ fontWeight: entry.score < score ? 'normal' : 'bold' }}>
                    {entry.username}: {entry.score}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
