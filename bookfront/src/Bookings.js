import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import wrenchLogo from './assets/wrench.jpg'

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://127.0.0.1:8000/api/bookings/', {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => console.log('Eroare la obținerea booking-urilor:', error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.status.toLowerCase().includes(search.toLowerCase()) ||
    booking.id.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <img
        src={wrenchLogo}
        alt="Logo Service Auto"
        className="w-20 h-20 mb-6"
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Booking-urile tale</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Caută după status sau ID..."
            className="border border-gray-300 p-2 rounded w-full mr-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/create-booking">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Adaugă Booking
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-500">Nu ai încă niciun booking.</p>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">ID Booking: {booking.id}</p>
                  <p className="text-sm text-gray-600">Status: <span className={`font-medium ${
                    booking.status === 'accepted' ? 'text-green-600' : booking.status === 'pending' ? 'text-yellow-500' : 'text-red-600'
                  }`}>{booking.status}</span></p>
                  <p className="text-sm text-gray-600">Preț Total: {booking.pret_total} RON</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
