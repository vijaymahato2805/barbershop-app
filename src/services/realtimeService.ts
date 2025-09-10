// src/services/realtimeService.ts
import { supabase } from "../lib/supabase";

// Subscribe to bookings in real-time
export const subscribeToBookings = (callback: (payload: any) => void) => {
  const channel = supabase
    .channel("bookings-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "bookings" },
      (payload) => {
        console.log("Booking change received:", payload);
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel); // cleanup when unsubscribing
  };
};
