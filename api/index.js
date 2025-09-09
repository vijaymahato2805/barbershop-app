// api/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import salonsRouter from './routes/salons.js';
import bookingsRouter from './routes/bookings.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Use the imported routers
app.use('/api/auth', authRouter);
app.use('/api/salons', salonsRouter);
app.use('/api/bookings', bookingsRouter);

// Simple health check route
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});