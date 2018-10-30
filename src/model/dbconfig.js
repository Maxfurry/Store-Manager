import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  process.stdout.write('connected to database\n');
});

export default pool;
