import db from './dbconfig';

db.query('DROP TABLE IF EXISTS users', (err) => {
  if (err) {
    console.log(err);
  }
});

db.query('DROP TABLE IF EXISTS products', (err) => {
  if (err) {
    console.log(err);
  }
});

db.query('DROP TABLE IF EXISTS sales', (err) => {
  if (err) {
    console.log(err);
  }
});
