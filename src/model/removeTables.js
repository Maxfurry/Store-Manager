import { pool } from './dbconfig';

pool.query('DROP TABLE IF EXISTS pro_cat CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
});

pool.query('DROP TABLE IF EXISTS sales CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
});

pool.query('DROP TABLE IF EXISTS sales_record CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
});

pool.query('DROP TABLE IF EXISTS category CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
});

pool.query('DROP TABLE IF EXISTS products CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
});

pool.query('DROP TABLE IF EXISTS users CASCADE', (err) => {
  if (err) {
    console.log(err);
  }
});
