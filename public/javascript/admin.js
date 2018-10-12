const users = document.getElementById("users");
const user = document.getElementById("user");

const items = document.getElementById("items");
const item = document.getElementById("item");

const records = document.getElementById("records");
const record = document.getElementById("record");

const categories = document.getElementById("categories");
const category = document.getElementById("category");

let showUser = () => {
    users.style.display = "block";
    items.style.display = "none";
    records.style.display = "none";
    categories.style.display = "none"
}

let showItem = () => {
    items.style.display = "block";
    records.style.display = "none";
    users.style.display = "none";
    categories.style.display = "none"
}

let showRecord = () => {
    records.style.display = "block";
    users.style.display = "none";
    items.style.display = "none";
    categories.style.display = "none"  
}

let showCategory = () => {
    records.style.display = "none";
    users.style.display = "none";
    items.style.display = "none";
    categories.style.display = "block";  
}

user.addEventListener('click', showUser);
item.addEventListener('click', showItem);
record.addEventListener('click', showRecord);
category.addEventListener('click', showCategory);
