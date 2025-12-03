// Mock API client
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
      resolve([
        { username: 'Player1', score: 150 },
        { username: 'Player2', score: 120 },
        { username: 'Player3', score: 90 },
      ]);
    }, 500);
  });
};
