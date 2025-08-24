import pool from '../config/db.js';

// ✅ Book a class session
export const createBooking = async (req, res) => {
  const { class_name, trainer_name, session_time } = req.body;
  const { id, name, email } = req.user;

  if (!class_name || !trainer_name || !session_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Get trainer slot limit from DB
    const trainerRes = await pool.query(
      `SELECT slot_limit FROM trainers 
       WHERE class_name = $1 AND name = $2 AND session_time = $3`,
      [class_name, trainer_name, session_time]
    );

    if (trainerRes.rowCount === 0) {
      return res.status(404).json({ error: 'Trainer not found for this session' });
    }

    const slotLimit = trainerRes.rows[0].slot_limit;

    // Count existing bookings for this trainer session
    const countRes = await pool.query(
      `SELECT COUNT(*) FROM bookings 
       WHERE class_name = $1 AND trainer_name = $2 AND session_time = $3`,
      [class_name, trainer_name, session_time]
    );
    const currentCount = parseInt(countRes.rows[0].count);

    if (currentCount >= slotLimit) {
      return res.status(400).json({ error: 'This session is fully booked.' });
    }

    // Insert booking
    const result = await pool.query(
      `INSERT INTO bookings 
       (user_id, name, email, class_name, trainer_name, session_time)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, name, email, class_name, trainer_name, session_time]
    );

    res.status(201).json({ message: 'Booking confirmed!', booking: result.rows[0] });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get bookings for logged-in user
export const getUserBookings = async (req, res) => {
  const userId = req.user.id;
  const className = req.query.class_name;

  try {
    const result = await pool.query(
      `SELECT trainer_name, session_time 
       FROM bookings 
       WHERE user_id = $1 AND class_name = $2`,
      [userId, className]
    );

    res.json(result.rows); // Always return array
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ error: 'Could not fetch bookings' });
  }
};

// ✅ Get available slots for all trainers in a class
export const getTrainerSlots = async (req, res) => {
  const { class_name } = req.query;
  if (!class_name) return res.status(400).json({ error: 'Class name is required' });

  try {
    // Fetch all trainers of that class
    const trainerRes = await pool.query(
      `SELECT name, session_time, slot_limit 
       FROM trainers 
       WHERE class_name = $1`,
      [class_name]
    );

    // Count existing bookings
    const bookingRes = await pool.query(
      `SELECT trainer_name, session_time, COUNT(*) AS count 
       FROM bookings 
       WHERE class_name = $1 
       GROUP BY trainer_name, session_time`,
      [class_name]
    );

    // Convert to map
    const bookingCounts = {};
    for (const row of bookingRes.rows) {
      const key = `${row.trainer_name}||${row.session_time}`;
      bookingCounts[key] = parseInt(row.count);
    }

    // Compute remaining slots
    const result = {};
    for (const row of trainerRes.rows) {
      const key = `${row.name}||${row.session_time}`;
      const booked = bookingCounts[key] ?? 0;
      result[key] = Math.max(0, row.slot_limit - booked);
    }

    res.json(result);
  } catch (err) {
    console.error("Error fetching trainer slots:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

