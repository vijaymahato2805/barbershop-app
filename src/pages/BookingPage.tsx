// src/pages/BookingPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createBooking, fetchSalons } from "../services/api";

const BookingPage: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [salon, setSalon] = useState<any>(null);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Load salon + services
  useEffect(() => {
    const loadSalon = async () => {
      try {
        const salons = await fetchSalons();
        const found = salons.find((s: any) => s.id === salonId);
        setSalon(found);
      } catch (err) {
        console.error(err);
      }
    };
    loadSalon();
  }, [salonId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (!user) {
        setMessage("Please log in to book.");
        return;
      }

      await createBooking({
        salonId: salonId!,
        serviceId,
        date,
        time,
        userId: user.id,
      });

      setMessage("🎉 Booking confirmed successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create booking. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!salon) {
    return <p className="p-6 text-gray-500">Loading salon details...</p>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{salon.name}</h1>
        <p className="text-gray-600 mb-6">{salon.description}</p>

        <form onSubmit={handleBooking} className="space-y-4">
          {/* Service dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="">Select a Service</option>
              {salon.services?.map((srv: any) => (
                <option key={srv.id} value={srv.id}>
                  {srv.name} – ₹{srv.price} ({srv.duration_minutes} min)
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-deep-green text-white py-2 px-4 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
            disabled={loading}
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
