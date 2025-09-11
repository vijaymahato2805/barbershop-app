// src/services/api.ts
import { supabase } from "../supabaseClient";

/**
 * Types
 */
export type Service = {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
};

export type Salon = {
  id: string;
  name: string;
  address: string;
  description?: string;
  image_url?: string;
  rating?: number;
  reviews?: number;
  services?: Service[];
};

export type Booking = {
  id: string;
  salon_id: string;
  service_id: string;
  user_id: string;
  date: string;
  time: string;
};

/**
 * ✅ Fetch salons with their services
 */
export const fetchSalons = async (): Promise<Salon[]> => {
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

  if (error) throw new Error(error.message);
  return data || [];
};

/**
 * ✅ Fetch single salon by ID (with services)
 */
export const fetchSalonDetail = async (id: string): Promise<Salon> => {
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
    `)
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * ✅ Create booking
 */
export const createBooking = async (bookingDetails: {
  salonId: string;
  serviceId: string;
  date: string;
  time: string;
  userId: string;
}): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        salon_id: bookingDetails.salonId,
        service_id: bookingDetails.serviceId,
        date: bookingDetails.date,
        time: bookingDetails.time,
        user_id: bookingDetails.userId,
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return data || [];
};

/**
 * ✅ Upload salon image to Supabase Storage
 */
export const uploadSalonImage = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("salon-images")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data: publicUrl } = supabase.storage
    .from("salon-images")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
};

/**
 * ✅ Create salon entry
 */
export const createSalon = async (salonDetails: {
  name: string;
  address: string;
  description?: string;
  image_url?: string;
}): Promise<Salon> => {
  const { data, error } = await supabase
    .from("salons")
    .insert([salonDetails])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

/**
 * ✅ Add services for a salon
 */
export const createServices = async (
  salonId: string,
  services: { name: string; price: number; duration_minutes: number }[]
): Promise<Service[]> => {
  const { data, error } = await supabase
    .from("services")
    .insert(
      services.map((s) => ({
        salon_id: salonId,
        ...s,
      }))
    )
    .select();

  if (error) throw new Error(error.message);
  return data || [];
};
