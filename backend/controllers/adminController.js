import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// GET: Fetch all classes
export const getAllClasses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM classes');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching classes:', err);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

// POST: Create a new class
export const createClass = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO classes (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );

    res.status(201).json({ message: 'Class created successfully!', class: result.rows[0] });
  } catch (err) {
    console.error('Error creating class:', err);
    res.status(500).json({ error: 'Failed to create class' });
  }
};

// GET: Fetch all trainers for a specific class
export const getTrainersForClass = async (req, res) => {
  const { class_name } = req.query;

  if (!class_name) {
    return res.status(400).json({ error: 'Class name is required' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM trainers WHERE LOWER(class_name) = LOWER($1)`,
      [class_name]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trainers:', err);
    res.status(500).json({ error: 'Failed to fetch trainers' });
  }
};

export const getUsersForTrainer = async (req, res) => {
  const { class_name, trainer_name, session_time } = req.query;
  if (!class_name || !trainer_name || !session_time) {
    return res.status(400).json({ error: 'Class, trainer, and session time are required' });
  }

  try {
    const result = await pool.query(
      `SELECT m.name, m.email, m.age, m.sex, m.number
       FROM bookings b
       JOIN members m ON b.user_id = m.id
       WHERE b.class_name = $1 AND b.trainer_name = $2 AND b.session_time = $3`,
      [class_name, trainer_name, session_time]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users for trainer:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};



// // POST: Add a new trainer
export const addTrainer = async (req, res) => {
  const { name, class_name, session_time, slot_limit} = req.body;
  


  if (!name || !class_name || !session_time || !slot_limit) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO trainers (name, class_name, session_time, slot_limit)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, class_name, session_time, slot_limit]
    );

    res.status(201).json({ message: 'Trainer added successfully!', trainer: result.rows[0] });
  } catch (err) {
    console.error('Error adding trainer:', err);
    res.status(500).json({ error: 'Failed to add trainer' });
  }
};


// PUT: Update a trainer
export const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const { name, session_time, slot_limit } = req.body; // changed from slots

  if (!name && !session_time && !slot_limit) {
    return res.status(400).json({ error: 'At least one field (name, session_time, slot_limit) is required to update' });
  }

  const updates = [];
  const values = [];
  let i = 1;

  if (name) {
    updates.push(`name = $${i++}`);
    values.push(name);
  }
  if (session_time) {
    updates.push(`session_time = $${i++}`);
    values.push(session_time);
  }
  if (slot_limit !== undefined) {
    updates.push(`slot_limit = $${i++}`);   // CORRECT COLUMN
    values.push(Number(slot_limit));
  }

  values.push(id); // for WHERE clause

  try {
    const result = await pool.query(
      `UPDATE trainers SET ${updates.join(', ')} WHERE id = $${i} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    res.json({ message: 'Trainer updated successfully', trainer: result.rows[0] });
  } catch (err) {
    console.error('Error updating trainer:', err);
    res.status(500).json({ error: 'Failed to update trainer' });
  }
};




// DELETE: Delete a trainer
export const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM trainers WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    res.json({ message: 'Trainer deleted successfully', deleted: result.rows[0] });
  } catch (err) {
    console.error('Error deleting trainer:', err);
    res.status(500).json({ error: 'Failed to delete trainer' });
  }
};

//Added
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Username and password required' });

  try {
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    const admin = result.rows[0];

    // SAFELY COMPARE HASHED PASSWORDS!
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: { id: admin.id, email: admin.email }
    });
  } catch (err) {
    console.error('Error during admin login:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

