// api/routes/auth.js
import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.post('/login', async (req, res) => {
  const { phone_number } = req.body;
  // In a real app, you would generate and send an OTP here.
  // For this example, we'll just simulate a successful response.
  res.status(200).json({ message: 'OTP sent to your phone number.' });
});

router.post('/verify', async (req, res) => {
  const { phone_number, otp } = req.body;
  
  // In a real app, you would verify the OTP.
  // We'll simulate success for this example.
  if (otp === '123456') { // Mock OTP
    let { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone_number', phone_number)
      .single();

    if (error && error.code === 'PGRST116') { // user not found
      // If user does not exist, create a new one
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ phone_number: phone_number }])
        .select('*');

      if (insertError) {
        return res.status(500).json({ message: 'Failed to create user', error: insertError.message });
      }
      user = data[0];
    } else if (error) {
        return res.status(500).json({ message: 'Database query failed', error: error.message });
    }
    
    // Create a mock token for the frontend to use
    const token = 'mock-auth-token';
    return res.status(200).json({ message: 'Login successful', user, token });

  } else {
    return res.status(401).json({ message: 'Invalid OTP.' });
  }
});

export default router;