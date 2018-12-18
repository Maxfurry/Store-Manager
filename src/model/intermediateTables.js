import { pool } from './dbconfig';

pool.query(`CREATE TABLE IF NOT EXISTS sales_record(
    record_id serial PRIMARY KEY,
    user_id integer REFERENCES users(user_id),
    sales_id integer REFERENCES sales(sale_id)
  )`, (err) => {
  if (err) {
    console.log(err);
  }
});

pool.query(`CREATE TABLE IF NOT EXISTS pro_cat(
    id serial PRIMARY KEY,
    cat_id integer REFERENCES category(cat_id),
    product_id integer REFERENCES products(product_id)
  )`, (err) => {
  if (err) {
    console.log(err);
  }
});
