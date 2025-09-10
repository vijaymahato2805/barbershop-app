// src/services/api.ts
import { supabase } from "../supabaseClient";

// ✅ Fetch salons with their services
export const fetchSalons = async () => {
  const { data, error } = await supabase
    .from("salons")
    .select(`
      id,
      name,
      address,
      description,
      image_url,
      rating,
      reviews,
      services (
        id,
        name,
        price,
        duration_minutes
      )
    `);

  if (error) throw error;
  return data;
};

// ✅ Create booking
export const createBooking = async (bookingDetails: {
  salonId: string;
  serviceId: string;
  date: string;
  time: string;
  userId: string;
}) => {
  const { data, error } = await supabase.from("bookings").insert([
    {
      salon_id: bookingDetails.salonId,
      service_id: bookingDetails.serviceId,
      date: bookingDetails.date,
      time: bookingDetails.time,
      user_id: bookingDetails.userId,
    },
  ]);

  if (error) throw error;
  return data;
};
