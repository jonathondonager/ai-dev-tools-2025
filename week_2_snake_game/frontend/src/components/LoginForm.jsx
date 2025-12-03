import React, { useState } from 'react';
import { login } from '../api/client';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) return;
    const user = await login(username, 'password');
    setUser(user);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
