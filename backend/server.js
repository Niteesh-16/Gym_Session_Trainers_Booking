//Ankith #2
// server.js
import express from 'express';
import dotenv  from 'dotenv';
import cors    from 'cors';
import pool    from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('➡️ ', req.method, req.originalUrl);
  next();
});

app.use('/api/users', userRoutes);

app.use('/api/admin', adminRoutes);


// ✅ mount the users router AFTER the middlewares & AFTER `app

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      number VARCHAR(15) NOT NULL,
      age INT CHECK (age BETWEEN 0 AND 120),
      sex VARCHAR(10) CHECK (sex IN ('Male','Female','Other')),
      address TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('🛠️  Table ensured');
}

initDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀  Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(console.error);
