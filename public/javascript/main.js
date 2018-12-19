const url = 'http://localhost:3000/api/v1/products';
const token = localStorage.getItem('token');
let items = {};

const productList = (object) => {
  const products = document.getElementById('cards');
  for (let i = 0; i < object.length; i += 1) {
    products.innerHTML += `
      <div class="card">
        <img src="images/pep.png" alt="">
        <div>
            <h3>${object[i].name}</h3>
            <p class="price">${object[i].price}</p>
            <p><button onClick = 'addCart(${i})'>Add to Cart</button></p>
        </div>
      </div>`;
  }
};

const product = () => {
  fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Authorization: `beerer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 204) {
        const products = document.getElementById('cards');
        products.innerHTML = 'No product to display, please contact site owner';

        throw new Error('No product to display');
      }

      return res.json();
    })
    .then((data) => {
      if (data.hasOwnProperty('err') && data.err.name === 'TokenExpiredError') {
        localStorage.setItem('token', '');
        localStorage.setItem('tokenError', 'Session has closed, please login again');
        window.location.replace('./login.html');
      }

      if (data.success === false) {
        throw new Error(data.message);
      }

      items = data.products;
      productList(data.products);
    })
    .catch(err => console.log(err));
};

const addCart = (id) => {
  let cartItems = [];
  const cartNum = document.getElementById('num');
  cartNum.innerHTML = parseInt(cartNum.innerHTML, 10) + 1;
  if (!localStorage.getItem('cart')) {
    cartItems.push(items[id]);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    return;
  }
  cartItems = JSON.parse(localStorage.getItem('cart'));
  cartItems.push(items[id]);
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

window.addEventListener('load', () => {
  if (localStorage.getItem('token') === null || !localStorage.getItem('token')) {
    window.location.replace('./login.html');
  }

  product();

  if (localStorage.getItem('cart')) {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    const cartNum = document.getElementById('num');
    cartNum.innerHTML = cartItems.length;
  }
});
