import { pool } from './dbconfig';

const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
      user_id serial PRIMARY KEY,
      name text NOT NULL,
      password text NOT NULL,
      position text NOT NULL,
      roles text NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS category(
      cat_id serial PRIMARY KEY,
      cat_name text NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS products(
      product_id serial PRIMARY KEY,
      name text NOT NULL,
      url text,
      price money NOT NULL,
      quantity integer NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS sales(
        sale_id serial PRIMARY KEY,
        product_id integer REFERENCES products(product_id),
        num_of_items integer NOT NULL,
        per_unit_price money NOT NULL,
        total_price money NOT NULL
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS sales_record(
      record_id serial PRIMARY KEY,
      user_id integer REFERENCES users(user_id),
      sales_id integer REFERENCES sales(sale_id)
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS pro_cat(
      id serial PRIMARY KEY,
      cat_id integer REFERENCES category(cat_id),
      product_id integer REFERENCES products(product_id)
    )`);
  } catch (error) {
    console.log(error);
  }
  console.log('All Tables Created Successfully!');
  process.exit();
};


createTable();
