// src/pages/BookingPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createBooking } from '../services/api';

const BookingPage: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Dummy data for now, will be replaced with form values
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const bookingDetails = {
        salonId,
        service,
        date,
        time,
        userId: user ? user.id : null,
      };

      await createBooking(bookingDetails);
      setMessage('Booking confirmed successfully!');
    } catch (error) {
      setMessage('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Book Your Service</h1>
        <p className="text-gray-600 mb-6">Booking for Salon ID: {salonId}</p>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
            <select 
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="">Select a Service</option>
              <option value="Haircut">Haircut</option>
              <option value="Beard Trim">Beard Trim</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-deep-green text-white py-2 px-4 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default BookingPage;