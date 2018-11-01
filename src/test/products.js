import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

let productID = '';

const product = {
  name: 'Pepsi',
  category: 'Drinks',
  price: '100',
  quantity: '500',
};

const updateProduct = {
  name: 'Pepsi',
  category: 'Drinks',
  price: '100',
  quantity: '300',
};

//  Test POST endpoint of Products
describe('API endpoint POST /products', () => {
  it('Should add product to file', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(product)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('product').be.an('object');
        res.body.product.should.have.property('name');
        res.body.product.should.have.property('category');
        res.body.product.should.have.property('price');
        res.body.product.should.have.property('quantity');
        res.body.should.have.property('message').eql('Product Created Successfully');
        done();
      });
  });

  it('Should return product exist if productId exist', (done) => {
    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(product)
      .then((res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Product already exist');
        done();
      });
  });

  it('Should return Request must contain category if there is no category', (done) => {
    const noCat = {
      name: 'Cocacola[60Cl]',
      category: '',
      price: '150',
      quantity: '230',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noCat)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain category');
        done();
      });
  });

  it('Should return Request must contain price if there is no price', (done) => {
    const noPrice = {
      name: 'Cocacola[60Cl]',
      category: 'Drinks',
      price: '',
      quantity: '230',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noPrice)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain price');
        done();
      });
  });

  it('Should return Price must contain only numbers if  price is not a number', (done) => {
    const letterPrice = {
      name: 'Cocacola[60Cl]',
      category: 'Drinks',
      price: 'aa',
      quantity: '230',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(letterPrice)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Price must contain only numbers');
        done();
      });
  });

  it('Should return Request must contain quantity if there is no quantity', (done) => {
    const noQuantity = {
      name: 'Cocacola[60Cl]',
      category: 'Drinks',
      price: '150',
      quantity: '',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noQuantity)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain quantity');
        done();
      });
  });

  it('Should return Quantity must contain only numbers if  Quantity is not a number', (done) => {
    const letterQuantity = {
      name: 'Cocacola[60Cl]',
      category: 'Drinks',
      price: '150',
      quantity: 'aa',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(letterQuantity)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Quantity must contain only numbers');
        done();
      });
  });

  it('Should return Quantity must not contain decimals if Quantity is a decimal', (done) => {
    const decimalQuantity = {
      name: 'Cocacola[60Cl]',
      category: 'Drinks',
      price: '150',
      quantity: '4.5',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(decimalQuantity)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Quantity must not contain decimals');
        done();
      });
  });

  it('Should return Request must contain product name if there is no name for the product', (done) => {
    const noName = {
      name: '',
      category: 'Drinks',
      price: '150',
      quantity: '230',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noName)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain product name');
        done();
      });
  });
});

// Test GET endpoint of Products
describe('API endpoint GET /products', () => {
  it('Should return all products', (done) => {
    chai.request(server)
      .get('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.products.should.be.an('array');
        res.body.should.have.property('success').eql(true);
        res.body.products[0].should.have.property('id');
        productID = res.body.products[0].id;
        res.body.products[0].should.have.property('name');
        res.body.products[0].should.have.property('category');
        res.body.products[0].should.have.property('price');
        res.body.products[0].should.have.property('quantity');
        res.body.should.have.property('message');
        res.body.message.should.eql('Request to get all product successfull');
        done();
      });
  });

  it('Should return specified product through its productId', (done) => {
    chai.request(server)
      .get(`/api/v1/products/${productID}`)
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.product.should.be.an('array');
        res.body.product[0].should.have.property('id');
        res.body.product[0].should.have.property('name');
        res.body.product[0].should.have.property('category');
        res.body.product[0].should.have.property('price');
        res.body.product[0].should.have.property('quantity');
        done();
      });
  });

  it('Should return Request to get specific product was not succesfull if product ID does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/products/1hj')
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .then((res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request to get specific product was not succesfull');
        done();
      });
  });
});

// Test PUT endpoint of Products
describe('API endpoint PUT /products', () => {
  it('Should return request was not succesfull, for invalid ID', (done) => {
    chai.request(server)
      .put('/api/v1/products/kjlkljl')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(updateProduct)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Your request was not succesfull, check product Id');
        done();
      });
  });

  it('Should delete data from file', (done) => {
    chai.request(server)
      .put(`/api/v1/products/${productID}`)
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(updateProduct)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Product updated Successfully');
        done();
      });
  });
});

// Test DELETE endpoint of Products
describe('API endpoint DELETE /products', () => {
  it('Should return request was not succesfull, for invalid ID', (done) => {
    chai.request(server)
      .delete('/api/v1/products/kjlkljl')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(product)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Your request was not succesfull');
        done();
      });
  });

  it('Should delete data from file', (done) => {
    chai.request(server)
      .delete(`/api/v1/products/${productID}`)
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(product)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Product Deleted Successfully');
        done();
      });
  });
});
