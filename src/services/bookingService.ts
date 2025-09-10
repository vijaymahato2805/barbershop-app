import { supabase } from "../lib/supabase";

export const createBooking = async (bookingDetails: {
  salonId: string;
  userId: string;
  service: string;
  date: string;
  time: string;
}) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        salon_id: bookingDetails.salonId,
        user_id: bookingDetails.userId,
        service: bookingDetails.service,
        booking_date: bookingDetails.date,
        booking_time: bookingDetails.time,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  if (error) throw error;
  return data;
};
