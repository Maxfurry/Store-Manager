import db from './dbconfig';


db.query(`CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    name text NOT NULL,
    password text NOT NULL,
    position text NOT NULL,
    roles text NOT NULL
    )`, (err) => {
  if (err) {
    console.log(err);
  }
});

db.query(`CREATE TABLE IF NOT EXISTS products(
id serial PRIMARY KEY,
name text NOT NULL,
category text NOT NULL,
price numeric NOT NULL,
quantity numeric NOT NULL
)`, (err) => {
  if (err) {
    console.log(err);
  }
});

db.query(`CREATE TABLE IF NOT EXISTS sales(
  id serial PRIMARY KEY,
  product text NOT NULL,
  category text NOT NULL,
  quantity numeric NOT NULL,
  price numeric NOT NULL,
  attendant text NOT NULL
  )`, (err) => {
  if (err) {
    console.log(err);
  }
});
