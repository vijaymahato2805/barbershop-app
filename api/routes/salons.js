// api/routes/salons.js
import { Router } from 'express';
const router = Router();

// Your salon routes will go here
router.get('/', (req, res) => {
  res.send('Salons route is working!');
});

export default router;