import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import wrenchLogo from './assets/wrench.jpg'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/bookings');
    } catch (err) {
      setError('Autentificare eșuată. Verifică datele.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <img
        src={wrenchLogo}
        alt="Logo Service Auto"
        className="w-20 h-20 mb-6"
      />
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Autentificare</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Parolă</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Nu ai cont?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
