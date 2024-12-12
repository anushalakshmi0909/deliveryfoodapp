import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // React Router v6 equivalent of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    // Fetch users from the json-server
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    // Check if the user exists
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      setUser(user);
      navigate('/');  // Redirect to home page after login
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
