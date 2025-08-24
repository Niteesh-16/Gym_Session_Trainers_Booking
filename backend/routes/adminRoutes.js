
import express from 'express';
import {
  createClass,
  getAllClasses,
  addTrainer,
  getTrainersForClass,
  getUsersForTrainer,
  updateTrainer,
  deleteTrainer,
  loginAdmin
} from '../controllers/adminController.js';

import authenticateAdmin from '../middleware/authenticateAdmin.js';

const router = express.Router();

// Admin Auth
// router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Class routes
router.post('/classes', authenticateAdmin, createClass);
router.get('/classes', authenticateAdmin, getAllClasses);

// Trainer routes
router.post('/trainers', authenticateAdmin, addTrainer);
router.get('/trainers', authenticateAdmin, getTrainersForClass);
router.get('/trainer-users', authenticateAdmin, getUsersForTrainer);
router.put('/trainers/:id', authenticateAdmin, updateTrainer);
router.delete('/trainers/:id', authenticateAdmin, deleteTrainer);

export default router;
