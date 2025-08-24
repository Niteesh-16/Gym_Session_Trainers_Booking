
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }   // Neon requires SSL
});

pool.connect()
  .then(c => {
    console.log('✅  Connected to Neon PostgreSQL');
    c.release();
  })
  .catch(e => {
    console.error('🛑  PG connection error →', e.message);
    process.exit(1);
  });

export default pool;
