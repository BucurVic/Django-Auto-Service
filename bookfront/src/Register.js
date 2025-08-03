import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import wrenchLogo from './assets/wrench.jpg'


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [role, setRole] = useState('client');
  const [extraField, setExtraField] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
      email,
      nume,
      prenume,
      role,
    };

    if (role === 'client') {
      payload.nr_masini = parseInt(extraField);
    } else if (role === 'worker') {
      payload.nr_ani_experienta = parseInt(extraField);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', payload);
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Înregistrare reușită!');
      navigate('/bookings');
    } catch (err) {
      console.error('Eroare la înregistrare:', err);
      setError(err.response?.data?.error || 'Eroare la înregistrare');
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
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Înregistrare</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username:</label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Parolă:</label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nume:</label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Prenume:</label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            value={prenume}
            onChange={(e) => setPrenume(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Rol:</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setExtraField('');
            }}
          >
            <option value="client">Client</option>
            <option value="worker">Worker</option>
          </select>
        </div>

        {(role === 'client' || role === 'worker') && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              {role === 'client' ? 'Număr mașini:' : 'Ani experiență:'}
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded"
              value={extraField}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setExtraField(isNaN(value) || value < 0 ? '0' : value.toString());
              }}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Înregistrează-te
        </button>

        <p className="text-sm text-center mt-4">
            Ai deja cont?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
            Loghează-te
              </Link>
        </p>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
