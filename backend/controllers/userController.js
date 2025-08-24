


import * as crypto from 'crypto';
import pool from '../config/db.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';

// Generate random member ID
const generateMemberID = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, number, age, sex, address, password } = req.body;
  const memberId = generateMemberID();
  const verificationToken = crypto.randomBytes(32).toString("hex");

  try {
    // Check if user exists
    const existing = await pool.query(
      'SELECT * FROM members WHERE email = $1',
      [email.trim()]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    await pool.query(
      `INSERT INTO members (name, email, number, age, sex, address, password, verification_token, is_verified) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)`,
      [name, email.trim(), number, age, sex, address, hashedPassword, verificationToken]
    );

    // Send verification email

const emailBody = `Hi ${name},

Welcome to our fitness family! We're excited to have you on board.

Your journey towards a healthier, stronger, and more energized life starts today.

Explore our wide variety of fitness classes—from strength training and yoga to HIIT and dance. Whether you're a beginner or a seasoned athlete, we've got something tailored just for you.

Click the link below to verify your account:
<http://localhost:5000/api/users/verify-email?token=${verificationToken}>

Let’s make fitness fun, consistent, and part of your lifestyle!

Stay motivated,  
— Team Explosive Fitness.`;



    await sendEmail(email, 'Verify your Account - Explosive Fitness', emailBody);

    res.status(201).json({
      message: 'Registered successfully. Please check your email to verify your account.',
      memberId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify email token
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.redirect('http://localhost:3000/login?verified=0');
  }

  try {
    const result = await pool.query(
      'SELECT * FROM members WHERE verification_token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      return res.redirect('http://localhost:3000/login?verified=0');
    }

    const user = result.rows[0];

    await pool.query(
      'UPDATE members SET is_verified = true, verification_token = NULL WHERE id = $1',
      [user.id]
    );

    return res.redirect('http://localhost:3000/login?verified=1');
  } catch (err) {
    console.error(err);
    return res.redirect('http://localhost:3000/login?verified=0');
  }
};

// User profile
export const userProfile = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      number: user.number,
      age: user.age,
      sex: user.sex,
      address: user.address,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
