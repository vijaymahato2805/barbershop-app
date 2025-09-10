import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import { supabase } from "../lib/supabase";

const BookingPage: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage("You must be logged in to book.");
        return;
      }

      const booking = await createBooking({
        salonId: salonId!,
        userId: user.id,
        service,
        date,
        time,
      });

      setMessage(`Booking confirmed! ID: ${booking.booking_id}`);
    } catch (error: any) {
      setMessage(error.message || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Book Your Service</h1>
        <p className="text-gray-600 mb-6">Salon ID: {salonId}</p>

        <form onSubmit={handleBooking} className="space-y-4">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className="w-full border rounded-md p-2"
          >
            <option value="">Select a Service</option>
            <option value="Haircut">Haircut</option>
            <option value="Beard Trim">Beard Trim</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border rounded-md p-2"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full border rounded-md p-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-deep-green text-white py-2 rounded-md"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
