import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';

const Home = ({ user }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      <div>
        <h2>Welcome to Snake Arena</h2>
        <p>Compete with others in this classic game!</p>
        {user ? (
          <Link to="/game">
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Play Now</button>
          </Link>
        ) : (
          <Link to="/login">
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Login to Play</button>
          </Link>
        )}
      </div>
      <Leaderboard />
    </div>
  );
};

export default Home;
