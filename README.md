# Store-Manager
[![Build Status](https://travis-ci.org/Maxfurry/Store-Manager.svg?branch=Develop)](https://travis-ci.org/Maxfurry/Store-Manager>) [![Coverage Status](https://coveralls.io/repos/github/Maxfurry/Store-Manager/badge.svg?branch=Develop)](https://coveralls.io/github/Maxfurry/Store-Manager?branch=Develop) <a href="https://codeclimate.com/github/Maxfurry/Store-Manager/maintainability"><img src="https://api.codeclimate.com/v1/badges/08a20e60d17f15e9eaeb/maintainability" /></a>

Store Manager is a web application that helps store owners manage sales and product inventory
records. This application is meant for use in a single store.

# Installing
Open a comand window or a shell
navigate to your desired folder
create a new folder (eg. StoreManager)
type "git clone https://github.com/Maxfurry/Store-Manager/"
-this will download the files to the folder
next type "npm install"
-this will install all dependencies into the folder, no global dependencies are present
now type "npm start", so as to run the app

# Features
1. Store attendant can search and add products to buyer’s cart.
2. Store attendant can see his/her sale records but can’t modify them.
3. App should show available products, quantity and price.
4. Store owner can see sales and can filter by attendants.
5. Store owner can add, modify and delete products.
6. Store owner can give admin rights to a store attendant.
7. Products should have categories.
8. Store attendants should be able to add products to specific categories.

# API
    Product
        GET/api/v1/products/                     |   Fetch all products
        GET/api/v1/products/:productId           |   Fetch a single product record
        POST/api/v1/products/                    |   Create a product
        PATCH/api/v1/products/                   |   Update a product information
        DELETE/api/v1/products/                  |   Delete a product

    Sales
        GET/api/v1/sales/                        |   Fetch all sale records
        GET/api/v1/sales/:saleId                 |   Fetch a single sale record
        POST/api/v1/sales/                       |   Create a sale order
        DELETE/api/v1/sales/                     |   Delete a sale record

    Users
        PATCH/api/v1/api/v1/auth/                |   Fetch all users
        DELETE/api/v1/api/v1/auth/               |   Fetch a single user
        POST/api/v1/api/v1/auth/create           |   Create a user
        POST/api/v1/api/v1/auth/login            |   Login User


#Issues
https://github.com/Maxfurry/Store-Manager/issues

Please reach out, we will be happy to hear from you

#UI
Maxfurry.github.io/Store-Manager

