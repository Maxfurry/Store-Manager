import bcrypt from 'bcryptjs';
import { pool } from './dbconfig';

const password = bcrypt.hashSync('admin', 10);
const value = ['Admin', password, 'owner', 'admin'];
pool.query(`INSERT INTO users(name, password, position, roles) 
            VALUES($1,$2,$3,$4)`, value, (err) => {
  if (err) {
    console.log(err);
  }
});

pool.query(`INSERT INTO category(cat_name) 
            VALUES('uncategorized')`, (err) => {
  if (err) {
    console.log(err);
  }
});
