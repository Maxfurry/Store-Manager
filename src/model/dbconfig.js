import { Pool } from 'pg';
import env from 'dotenv';

env.config();

let connectionString = '';

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
  console.log('==============', process.env.NODE_ENV);
} else {
  connectionString = process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString: connectionString,
});

pool.on('connect', () => {
  process.stdout.write('connected to database\n');
});

export default pool;
