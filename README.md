# Store-Manager
[![Build Status](https://travis-ci.org/Maxfurry/Store-Manager.svg?branch=Develop)](https://travis-ci.org/Maxfurry/Store-Manager>) [![Coverage Status](https://coveralls.io/repos/github/Maxfurry/Store-Manager/badge.svg?branch=Develop)](https://coveralls.io/github/Maxfurry/Store-Manager?branch=Develop) <a href="https://codeclimate.com/github/Maxfurry/Store-Manager/maintainability"><img src="https://api.codeclimate.com/v1/badges/08a20e60d17f15e9eaeb/maintainability" /></a>

    Store Manager is a web application that helps store owners manage 
    sales and product inventory records. 
    This application is meant for use in a single store.

## Documentation

### Feature
    1. Store attendant can search and add products to buyer’s cart.
    2. Store attendant can see his/her sale records but can’t modify them.
    3. App should show available products, quantity and price.
    4. Store owner can see sales and can filter by attendants.
    5. Store owner can add, modify and delete products.
    6. Store owner can give admin rights to a store attendant.
    7. Products should have categories.
    8. Store attendants should be able to add products to specific categories.

### API
    Product
        GET/api/v1/products/                     |   Fetch all products
        GET/api/v1/products/:productId           |   Fetch a single product record
        POST/api/v1/products/                    |   Create a product

    Sales
        GET/api/v1/sales/                        |   Fetch all sale records
        GET/api/v1/sales/:saleId                 |   Fetch a single sale record
        POST/api/v1/sales/                       |   Create a sale order
    

## Setup

### Dependencies
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-register": "^6.26.0",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "chai": "^4.2.0",
    "chai-http": "^4.2.0",
    "coveralls": "^3.0.2",
    "dotenv": "^6.1.0",
    "eslint": "^5.7.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.14.0",
    "express": "^4.16.4",
    "express-validator": "^5.3.0",
    "jsonwebtoken": "^8.3.0",
    "mocha": "^5.2.0",
    "mocha-lcov-reporter": "^1.3.0",
    "nodemon": "^1.18.4",
    "nyc": "^13.1.0"

### Getting Stated
    Open a comand window or a shell
    navigate to your desired folder
    create a new folder (eg. StoreManager)
    Enter commands:
        "git clone https://github.com/Maxfurry/Store-Manager/"
            -this will download the files to the folder
        "git checkout Develop"
            -this will take you the develop branch

### Run The Service
    Enter command "npm install"
    -this will install all dependencies into the folder, no global dependencies are present
    now type "npm start", to start the server 

## Testing
    For testing, the framework used is Mocha 
    Assertion libary used is Chai
    Enter command "npm test", to run test

## Contribute
    Temitope Olarewaju - Learning Facilitator 

## Issues
https://github.com/Maxfurry/Store-Manager/issues

Please reach out, we will be happy to hear from you

## User Interface
https://Maxfurry.github.io/Store-Manager

