import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/client';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getLeaderboard().then(setScores);
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h3>Leaderboard</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {scores.map((entry, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '5px 0' }}>
            <span>{index + 1}. {entry.username}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
