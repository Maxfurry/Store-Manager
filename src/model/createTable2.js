import { pool } from './dbconfig';

pool.query(`CREATE TABLE IF NOT EXISTS sales(
    sale_id serial PRIMARY KEY,
    product_id integer REFERENCES products(product_id),
    num_of_items integer NOT NULL,
    per_unit_price money NOT NULL,
    total_price money NOT NULL
  )`, (err) => {
  if (err) {
    console.log(err);
  }
});
