import { pool } from './dbconfig';

const myArray = [{
  proName: 'Farouz', proPrice: 150, proQuantity: 400, catName: 'drinks',
}, {
  proName: 'Fanta', proPrice: 150, proQuantity: 350,
}, {
  proName: 'Sprite', proPrice: 100, proQuantity: 0, catName: 'water',
}];

myArray.map(async (product) => {
  if (!product.catName) {
    product.catName = 'uncategorized';
  }
  await pool.query(`select createProduct('{"proName": "${product.proName}", "proPrice": ${product.proPrice}, "proQuantity": ${product.proQuantity}, "catName": "${product.catName}"}'
)`, (err) => {
    if (err) {
      return console.log(err);
    }
    return process.exit();
  });
});
