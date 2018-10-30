import db from './dbconfig';

db.query('DROP TABLE IF EXISTS users', (err) => {
  if (err) {
    process.stdout.write(err);
  }
});

db.query('DROP TABLE IF EXISTS products', (err) => {
  if (err) {
    process.stdout.write(err);
  }
});

db.query('DROP TABLE IF EXISTS sales', (err) => {
  if (err) {
    process.stdout.write(err);
  }
});
