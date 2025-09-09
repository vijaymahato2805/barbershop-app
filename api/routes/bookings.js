// api/routes/bookings.js
import { Router } from 'express';
const router = Router();

// Your booking routes will go here
router.get('/', (req, res) => {
  res.send('Bookings route is working!');
});

export default router;