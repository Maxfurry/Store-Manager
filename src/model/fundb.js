import { pool } from './dbconfig';


// const proN = 'Pepsii';
// const price = 34;
// const quan = 23;
const cat = 'snacks';

const myArray = [{
  proName: 'Farouz', proPrice: 150, proQuantity: 400, catName: cat,
}, {
  proName: 'Fanta', proPrice: 150, proQuantity: 350, catName: cat,
}, {
  proName: 'Sprite', proPrice: 100, proQuantity: 200, catName: cat,
}];


pool.query(`select inpro('{"proName": "${myArray[0].proName}", "proPrice": ${myArray[0].proPrice}, "proQuantity": ${myArray[0].proQuantity}, "catName": "${myArray[0].catName}"}'
)`, (err) => {
  if (err) {
    console.log(err);
  }
});
