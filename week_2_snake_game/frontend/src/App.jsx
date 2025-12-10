import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route 
          path="/game" 
          element={user ? <Game user={user} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
