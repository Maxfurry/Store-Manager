import { pool } from './dbconfig';

const dropTables = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS category CASCADE');
    await pool.query('DROP TABLE IF EXISTS products CASCADE');
    await pool.query('DROP TABLE IF EXISTS sales CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.query('DROP TABLE IF EXISTS pro_cat');
    await pool.query('DROP TABLE IF EXISTS sales_record');
  } catch (error) {
    console.log(error);
  }
  console.log('All Tables Dropped Successfully!');
  process.exit();
};

dropTables();
