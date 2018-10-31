import bcrypt from 'bcryptjs';
import db from './dbconfig';

const password = bcrypt.hashSync('admin', 10);
const value = ['Adeniran Mark', password, 'owner', 'admin'];
db.query('INSERT INTO users(name, password, position, roles) VALUES($1,$2,$3,$4)', value, (err) => {
  if (err) {
    console.log(err);
  }
});
