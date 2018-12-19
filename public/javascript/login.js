const url = 'http://localhost:3000/api/v1/auth/login';
const user = document.getElementById('username');
const password = document.getElementById('password');
const error = document.getElementById('error');

const authenticate = () => {
  fetch(url, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'text/html',
    },
    body: JSON.stringify({
      name: user.value,
      password: password.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.success === false) {
        error.innerHTML = data.message;
        return;
      }

      error.innerHTML = '';
      localStorage.setItem('tokenError', '');
      localStorage.setItem('token', data.token);
      window.location.replace('./index.html');
    })
    .catch(err => console.log(err));
};

window.addEventListener('load', () => {
  if (localStorage.getItem('tokenError')) {
    error.innerHTML = localStorage.getItem('tokenError');
  }
});
