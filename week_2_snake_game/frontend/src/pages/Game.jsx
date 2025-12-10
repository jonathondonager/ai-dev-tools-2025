import React from 'react';
import GameBoard from '../components/GameBoard';

const Game = ({ user }) => {
  return (
    <div>
      <h2>Playing as {user.username}</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GameBoard user={user} />
      </div>
    </div>
  );
};

export default Game;
