const url = 'http://localhost:3000/api/v1/products';
const token = localStorage.getItem('token');

let cartItems = [];
if (localStorage.getItem('cart')) {
  cartItems = JSON.parse(localStorage.getItem('cart'));
}

const productList = (object) => {
  const products = document.getElementById('content');
  products.innerHTML = '';
  let value = 1;

  if (!cartItems || cartItems.length < 1) {
    products.innerHTML = '<h1>You do not have any product here yet<h1>';
    return;
  }

  for (let i = 0; i < object.length; i += 1) {
    if (!cartItems[i].quantity2boy) {
      value = 1;
    } else {
      value = cartItems[i].quantity2boy;
    }

    products.innerHTML += `   
      <div class="products">       
        <div id="delete-btn" onClick = 'removeItem(${i})'></div>     
        <div class="pic">
            <img src="images/pep.png" alt="" width = 80 height =80/>
        </div>
    
        <div class="description">
            <span class="desc">${object[i].name}</span>
            <span class="desc">${object[i].price}</span>
        </div>
    
        <div class="quantity">
            <button class="btn" type="button" name="button" onClick = 'modifyCount(${i}, "add", ${object[i].quantity})'>
                <img src="images/plus.svg" alt="" />
            </button>
            <input type="text" id="count${i}" value="${value}" disabled>
            <button class="btn" type="button" name="button" onClick = 'modifyCount(${i}, "sub")'>
                <img src="images/minus.svg" alt="" />
            </button>
        </div>
    </div>`;
  }
};

const initialAmount = (object) => {
  const amount = document.getElementById('amount');
  let quantity = 0;
  let amt = 0;

  for (let i = 0; i < object.length; i += 1) {
    if (!cartItems[i].quantity2boy) {
      quantity = 1;
    } else {
      quantity = parseInt(cartItems[i].quantity2boy, 10);
    }

    amt += quantity * parseInt(cartItems[i].price, 10);
  }
  amount.value = amt;
};

const modifyAmount = (id, flag) => {
  const amount = document.getElementById('amount');
  let quantity = parseInt(cartItems[id].quantity2boy, 10);
  let amt = parseInt(amount.value, 10);

  if (flag === 'add') {
    amt += parseInt(cartItems[id].price, 10);
    amount.value = amt;
  }

  if (flag === 'sub') {
    if (!cartItems[id].quantity2boy) {
      quantity = 1;
    }
    amt -= quantity * parseInt(cartItems[id].price);
    amount.value = amt;
  }
};

const removeItem = (id) => {
  const flag = 'sub';
  modifyAmount(id, flag);
  cartItems.splice(id, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  cartItems = JSON.parse(localStorage.getItem('cart'));
  productList(cartItems);
};

const modifyCart = (id, flag) => {
  let quantity = 0;
  let value = 0;

  if (flag === 'add') {
    if (!cartItems[id].quantity2boy) {
      cartItems[id].quantity2boy = 2;
      value = 2;
    } else {
      quantity = parseInt(cartItems[id].quantity2boy, 10);
      value = quantity + 1;
      cartItems[id].quantity2boy = value;
    }
  }

  if (flag === 'sub') {
    quantity = parseInt(cartItems[id].quantity2boy, 10);
    value = quantity - 1;
    cartItems[id].quantity2boy = value;
  }

  localStorage.setItem('cart', JSON.stringify(cartItems));
  cartItems = JSON.parse(localStorage.getItem('cart'));
  return value;
};

const modifyCount = (id, flag, quantityLimit) => {
  const count = document.getElementById(`count${id}`);
  let itemCount = parseInt(count.value, 10);

  if (flag === 'add' && itemCount < quantityLimit) {
    itemCount = modifyCart(id, flag);
    modifyAmount(id, flag);
  }

  if (flag === 'sub' && itemCount > 1) {
    itemCount = modifyCart(id, flag);
    modifyAmount(id, flag);
  }
  return count.value = itemCount;
};

const checkOut = () => {
  const orders = [];
  for (let i = 0; i < cartItems.length; i += 1) {
    let quantity = 0;
    let order = {};
    if (!cartItems[i].quantity2boy) {
      quantity = 1;
    } else {
      quantity = cartItems[i].quantity2boy;
    }

    order = {
      product: cartItems[i].name,
      category: cartItems[i].category,
      quantity,
      price: cartItems[i].price,
      attendant: 'Adeniran Mark',
    };
    orders.push(order);
  }
};

const checkOutDb = (orders) => {
  fetch(url, {
    method: 'PUT',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `beerer ${token}`,
    },
    body: JSON.stringify(orders),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.success === false) {
        // error.innerHTML = data.message;
        return;
      }

      // error.innerHTML = '';
      

      window.location.replace('./index.html');
    })
    .catch(err => console.log(err));
};

window.addEventListener('load', () => {
  if (localStorage.getItem('token') === null || !localStorage.getItem('token')) {
    window.location.replace('./login.html');
  }

  productList(cartItems);
  initialAmount(cartItems);
  console.log(cartItems);
});
