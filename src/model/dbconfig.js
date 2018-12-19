import { Pool, Client } from 'pg';
import env from 'dotenv';

env.config();

let connectionString = '';

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
  console.log('==============', process.env.NODE_ENV);
} else {
  connectionString = process.env.DATABASE_URL_local;
}

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => {
  process.stdout.write('connected to database as pool\n');
});

const client = new Client({
  connectionString,
});

client.connect();

export { pool, client };
