import bcrypt from 'bcryptjs';
import { pool } from './dbconfig';

const createData = async () => {
  const password = bcrypt.hashSync('admin', 10);
  const value = ['Admin', password, 'owner', 'admin'];
  try {
    await pool.query(`INSERT INTO users(name, password, position, roles) 
            VALUES($1,$2,$3,$4)`, value);

    await pool.query(`INSERT INTO category(cat_name) 
            VALUES('uncategorized')`);

    await pool.query(
      `CREATE or REPLACE FUNCTION createProduct(pro json)
    RETURNS text as $$
    DECLARE 
    catId integer;
    proId integer;
    begin 
    SELECT INTO catId cat_id FROM category WHERE cat_name = pro ->> 'catName'; 
    
    if catId > 0 then 
      INSERT INTO products(name, price, quantity, url) VALUES(pro ->> 'proName', (pro ->> 'proPrice'):: money, (pro ->> 'proQuantity'):: integer, pro ->> 'url') RETURNING product_id INTO proId;
      INSERT INTO pro_cat(cat_id, product_id) VALUES(catId, proId);
      return 'Product added';
    else
      INSERT INTO category(cat_name) VALUES(pro ->> 'catName') RETURNING cat_id INTO catId;
      INSERT INTO products(name, price, quantity, url) VALUES(pro ->> 'proName', (pro ->> 'proPrice'):: money, (pro ->> 'proQuantity'):: integer, pro ->> 'url') RETURNING product_id INTO proId;
      INSERT INTO pro_cat(cat_id, product_id) VALUES(catId, proId);
      return 'Product added and category created';
    end if;
    end;
    $$ language plpgsql;`,
    );
  } catch (error) {
    console.log(error);
  }
  console.log('All initial Data and Functions Added Succesfully!');
  process.exit();
};

createData();
