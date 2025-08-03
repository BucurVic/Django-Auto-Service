import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBooking = () => {
  const [pretTotal, setPretTotal] = useState('');
  const [bookingType, setBookingType] = useState('repair');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/bookings/create/',
        {
          pret_total: pretTotal,
          booking_type: bookingType,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Booking creat cu succes!');
      navigate('/bookings');
    } catch (err) {
      console.error('Eroare la creare booking:', err);
      setError('Crearea booking-ului a eșuat.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Creează Booking</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Preț Total</label>
          <input
            type="number"
            value={pretTotal}
            onChange={(e) => setPretTotal(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Tip Booking</label>
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="repair">Reparație</option>
            <option value="inspection">Inspecție</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Trimite
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;