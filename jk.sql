CREATE or REPLACE FUNCTION allpro(proName text, proPrice numeric, proQuantity integer, catName text)
RETURNS text as $$
DECLARE 
catId integer;
proId integer;
begin 
SELECT INTO catId cat_id FROM category WHERE cat_name = catName; 

if catId > 0 then 
	INSERT INTO products(name, price, quantity) VALUES(proName, proPrice, proQuantity) RETURNING product_id INTO proId;
	INSERT INTO pro_cat(cat_id, product_id) VALUES(catId, proId);
	return 'Product added';
else
	INSERT INTO category(cat_name) VALUES(catName) RETURNING cat_id INTO catId;
	INSERT INTO products(name, price, quantity) VALUES(proName, proPrice, proQuantity) RETURNING product_id INTO proId;
	INSERT INTO pro_cat(cat_id, product_id) VALUES(catId, proId);
	return 'Product added and category ' || catName || ' created';
end if;

end;
$$ language plpgsql;




CREATE or REPLACE FUNCTION inpro(pro json)
RETURNS text as $$
DECLARE 
catId integer;
proId integer;
begin 
SELECT INTO catId cat_id FROM category WHERE cat_name = pro ->> 'catName'; 

if catId = 1 then 
	INSERT INTO products(name, price, quantity, cast_id) VALUES(pro ->> 'proName', (pro ->> 'proPrice'):: money, (pro ->> 'proQuantity'):: integer, catId) RETURNING id INTO proId;
	INSERT INTO pro_cat(cat_id, product_id) VALUES(catId, proId);
	return 'Product added';
else
	return 'Failed';
end if;
end;
$$ language plpgsql;