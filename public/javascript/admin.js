let state = 'closed';

function openNav() {
  if (state == 'closed') {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.style.display = 'block';
    state = 'open';
  } else {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.style.display = 'none';
    state = 'closed';
  }
}

function myFunc() {
  if (window.screen.width >= 768) {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.style.display = 'block';
  }
  if (window.screen.width < 768) {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.style.display = 'none';
  }
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  const sideMenu = document.getElementById('sideMenu');
  sideMenu.style.display = 'none';
  state = 'closed';
}

const users = document.getElementById('users');
const user = document.getElementById('user');

const items = document.getElementById('items');
const item = document.getElementById('item');

const records = document.getElementById('records');
const record = document.getElementById('record');

const categories = document.getElementById('categories');
const category = document.getElementById('category');

const showUser = () => {
  users.style.display = 'block';
  items.style.display = 'none';
  records.style.display = 'none';
  categories.style.display = 'none';
};

const showItem = () => {
  items.style.display = 'block';
  records.style.display = 'none';
  users.style.display = 'none';
  categories.style.display = 'none';
};

const showRecord = () => {
  records.style.display = 'block';
  users.style.display = 'none';
  items.style.display = 'none';
  categories.style.display = 'none';
};

const showCategory = () => {
  records.style.display = 'none';
  users.style.display = 'none';
  items.style.display = 'none';
  categories.style.display = 'block';
};

user.addEventListener('click', showUser);
item.addEventListener('click', showItem);
record.addEventListener('click', showRecord);
category.addEventListener('click', showCategory);
