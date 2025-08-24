
import express from 'express';
import { registerUser, userProfile } from '../controllers/userController.js';
import { loginUser } from '../controllers/loginUser.js';
import authenticateToken from '../middleware/authenticateToken.js';
import { createBooking } from '../controllers/bookingController.js';
import { getUserBookings } from '../controllers/bookingController.js';
import { getTrainerSlots } from '../controllers/bookingController.js';

import { verifyEmail } from '../controllers/userController.js';

const router = express.Router();

router.get('/ping', (_, res) => res.send('pong'));
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, userProfile);
router.post('/book-class', authenticateToken, createBooking);
router.get('/book-class', authenticateToken, getUserBookings);
router.get('/trainer-slots', authenticateToken, getTrainerSlots);

router.get('/verify-email', verifyEmail);


export default router;
