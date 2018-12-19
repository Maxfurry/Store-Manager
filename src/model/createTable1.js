import { client } from './dbconfig';


client.query(`CREATE TABLE IF NOT EXISTS users(
  user_id serial PRIMARY KEY,
  name text NOT NULL,
  password text NOT NULL,
  position text NOT NULL,
  roles text NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
});

client.query(`CREATE TABLE IF NOT EXISTS category(
  cat_id serial PRIMARY KEY,
  cat_name text NOT NULL
  )`, (err) => {
  if (err) {
    console.log(err);
  }
});

client.query(`CREATE TABLE IF NOT EXISTS products(
  product_id serial PRIMARY KEY,
  name text NOT NULL,
  price money NOT NULL,
  quantity integer NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
});
