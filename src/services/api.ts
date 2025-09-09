// src/services/api.ts

// Toggle this to use mock data for development without a running backend.
const USE_MOCK_API = true;

const BASE_URL = 'http://localhost:3001/api';

/**
 * Mocks a network request delay.
 */
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Mock Data ---
const MOCK_SALONS = [
  {
    id: 'salon-1',
    name: 'The Royal Clipper',
    address: '123, Main Street, Mumbai',
    rating: 4.8,
    reviews: 250,
    image: 'https://via.placeholder.com/400x250.png?text=Royal+Clipper',
    description: 'A premium barber shop specializing in modern haircuts and beard styling.',
    services: [
      { id: 'service-1', name: 'Haircut', price: 500, duration_minutes: 45 },
      { id: 'service-2', name: 'Beard Trim', price: 250, duration_minutes: 30 },
      { id: 'service-3', name: 'Shaving', price: 300, duration_minutes: 30 },
    ],
  },
  {
    id: 'salon-2',
    name: 'Style & Shears',
    address: '456, Gandhi Nagar, Mumbai',
    rating: 4.5,
    reviews: 180,
    image: 'https://via.placeholder.com/400x250.png?text=Style+%26+Shears',
    description: 'A trendy salon offering a wide range of services from haircuts to hair coloring.',
    services: [
      { id: 'service-4', name: 'Haircut', price: 400, duration_minutes: 45 },
      { id: 'service-5', name: 'Hair Spa', price: 800, duration_minutes: 60 },
      { id: 'service-6', name: 'Coloring', price: 1500, duration_minutes: 90 },
    ],
  },
  {
    id: 'salon-3',
    name: 'Urban Beard Co.',
    address: '789, MG Road, Mumbai',
    rating: 4.9,
    reviews: 320,
    image: 'https://via.placeholder.com/400x250.png?text=Urban+Beard+Co.',
    description: 'Your go-to spot for classic grooming, focused on beards and traditional shaves.',
    services: [
      { id: 'service-7', name: 'Beard Trim', price: 300, duration_minutes: 30 },
      { id: 'service-8', name: 'Hot Towel Shave', price: 450, duration_minutes: 45 },
    ],
  },
];

// --- API Functions ---

/**
 * Handles user login with a phone number.
 * @param phoneNumber The user's phone number.
 */
export const loginWithPhoneNumber = async (phoneNumber: string) => {
  if (USE_MOCK_API) {
    console.log(`[Mock API] Sending OTP to ${phoneNumber}`);
    await mockDelay(500);
    return { success: true };
  }

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

/**
 * Verifies the OTP and logs the user in.
 * @param phoneNumber The user's phone number.
 * @param otp The one-time password.
 */
export const verifyOTP = async (phoneNumber: string, otp: string) => {
  if (USE_MOCK_API) {
    await mockDelay(500);
    if (otp === '123456') {
      console.log(`[Mock API] Verified OTP for ${phoneNumber}`);
      return {
        user: { id: 'user-123', phone_number: phoneNumber, full_name: 'Test User' },
        token: 'mock-auth-token-123',
      };
    } else {
      throw new Error('Invalid OTP');
    }
  }

  const response = await fetch(`${BASE_URL}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, otp }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

/**
 * Fetches a list of nearby salons.
 */
export const getNearbySalons = async () => {
  if (USE_MOCK_API) {
    await mockDelay(500);
    return MOCK_SALONS;
  }
  
  const response = await fetch(`${BASE_URL}/salons`);
  if (!response.ok) {
    throw new Error('Failed to fetch salons');
  }
  return response.json();
};

/**
 * Fetches detailed information for a specific salon.
 * @param id The salon's ID.
 */
export const getSalonDetail = async (id: string) => {
  if (USE_MOCK_API) {
    await mockDelay(500);
    const salon = MOCK_SALONS.find(s => s.id === id);
    if (!salon) {
      throw new Error('Salon not found');
    }
    return salon;
  }

  const response = await fetch(`${BASE_URL}/salons/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch salon details');
  }
  return response.json();
};

/**
 * Submits a new booking request.
 * @param bookingDetails The details of the new booking.
 */
export const createBooking = async (bookingDetails: any) => {
  if (USE_MOCK_API) {
    await mockDelay(500);
    console.log('[Mock API] Booking created:', bookingDetails);
    return { success: true, bookingId: 'booking-123' };
  }
  
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Add this for real auth
    },
    body: JSON.stringify(bookingDetails),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};