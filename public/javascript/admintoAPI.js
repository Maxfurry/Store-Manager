const userUrl = 'http://localhost:3000/api/v1/auth/signup';
const productUrl = 'http://localhost:3000/api/v1/products';
const token = localStorage.getItem('token');

const userName = document.getElementById('userName');
const userPassword = document.getElementById('userPassword');
const userRole = document.getElementById('userRole');
const userPosition = document.getElementById('userPosition');

const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productPrice = document.getElementById('productPrice');
const productQuantity = document.getElementById('productQuantity');

const createUser = () => {
  fetch(userUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `beerer ${token}`,
    },
    body: JSON.stringify({
      name: userName.value,
      password: userPassword.value,
      role: userRole.value,
      position: userPosition.value,
    }),
  })
    .then((res) => {
      console.log(res);
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

      // error.innerHTML = '';
      // window.location.replace('./index.html');
    })
    .catch(err => console.log(err));
};

const createproduct = () => {
  fetch(productUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `beerer ${token}`,
    },
    body: JSON.stringify({
      name: productName.value,
      category: productCategory.value,
      price: productPrice.value,
      quantity: productQuantity.value,
    }),
  })
    .then((res) => {
      console.log(res);
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

      // error.innerHTML = '';
      // window.location.replace('./index.html');
    })
    .catch(err => console.log(err));
};
