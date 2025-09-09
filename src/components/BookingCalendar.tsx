// src/components/BookingCalendar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookingCalendarProps {
  salonId: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ salonId }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const availableSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  const handleBookNow = () => {
    if (selectedDate && selectedTime) {
      // Navigate to the booking page with salonId and selected details
      navigate(`/book/${salonId}?date=${selectedDate}&time=${selectedTime}`);
    } else {
      alert('Please select a date and time.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Book Your Appointment</h2>
      
      {/* Date Picker */}
      <div className="mb-4">
        <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700">Select Date</label>
        <input
          type="date"
          id="booking-date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-deep-green focus:ring-deep-green"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Available Slots</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`py-2 px-4 rounded-md border transition-colors ${
                  selectedTime === slot ? 'bg-deep-green text-white border-deep-green' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <button
        type="button"
        onClick={handleBookNow}
        className="w-full bg-saffron text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
        disabled={!selectedDate || !selectedTime}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingCalendar;