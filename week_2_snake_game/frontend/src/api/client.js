// Mock API client
let mockScores = [
  { username: 'Player1', score: 150 },
  { username: 'Player2', score: 120 },
  { username: 'Player3', score: 90 },
];

export const login = async (username, password) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username, id: 1 });
    }, 500);
  });
};

export const getLeaderboard = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockScores]);
    }, 500);
  });
};

export const saveScore = async (username, score) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Saved score ${score} for ${username}`);
      mockScores.push({ username, score });
      mockScores.sort((a, b) => b.score - a.score);
      mockScores = mockScores.slice(0, 3); // Keep top 3
      resolve({ success: true });
    }, 500);
  });
};
