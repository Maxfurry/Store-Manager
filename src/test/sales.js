import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

let saleID = '';

const sale = {
  product: 'Pepsi[50Cl]',
  category: 'Drinks',
  quantity: '2',
  price: '200',
  attendant: 'Adeniran Mark',
};

//  Test POST endpoint of sale
describe('API endpoint POST /sales', () => {
  it('Should add sales order to file', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(sale)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('sale').be.an('object');
        res.body.sale.should.have.property('product');
        res.body.sale.should.have.property('category');
        res.body.sale.should.have.property('price');
        res.body.sale.should.have.property('quantity');
        res.body.sale.should.have.property('attendant');
        res.body.should.have.property('message').eql('Sale record created successfully');
        done();
      });
  });

  it('Should return Request must contain category if there is no category', (done) => {
    const noCat = {
      product: 'Pepsi[50Cl]',
      category: '',
      quantity: '2',
      price: '200',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noCat)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain category');
        done();
      });
  });

  it('Should return Request must contain price if there is no price', (done) => {
    const noPrice = {
      product: 'Pepsi[50Cl]',
      category: 'Drinks',
      quantity: '2',
      price: '',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noPrice)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain price');
        done();
      });
  });

  it('Should return Price must contain only numbers if price is not a number', (done) => {
    const letterPrice = {
      product: 'Pepsi[50Cl]',
      category: 'Drinks',
      quantity: '2',
      price: 'aa',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(letterPrice)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Price must contain only numbers');
        done();
      });
  });

  it('Should return Request must contain quantity if there is no quantity', (done) => {
    const noQuantity = {
      product: 'Pepsi[50Cl]',
      category: 'Drinks',
      quantity: '',
      price: '200',
      attendant: 'Adeniran Mark'
    };

    chai.request(server)
      .post('/api/v1/sales')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noQuantity)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain quantity');
        done();
      });
  });

  it('Should return Quantity must contain only numbers if Quantity is not a number', (done) => {
    const letterQuantity = {
      product: 'Pepsi[50Cl]',
      salesId: '000078',
      category: 'Drinks',
      quantity: 'aa',
      price: '200',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/products')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(letterQuantity)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Quantity must contain only numbers');
        done();
      });
  });

  it('Should return Quantity must not contain decimals if there is Quantity is a decimal', (done) => {
    const decimalQuantity = {
      product: 'Pepsi[50Cl]',
      salesId: '000078',
      category: 'Drinks',
      quantity: '4.5',
      price: '200',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .send(decimalQuantity)
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Quantity must not contain decimals');
        done();
      });
});

  it('Should return Request must contain product name if there is no name for the product', (done) => {
    const noName = {
      product: '',
      salesId: '000078',
      category: 'Drinks',
      quantity: '2',
      price: '200',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
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

  it('Should return Request must contain attendant name if there is no name of attendant', (done) => {
    const noProductId = {
      product: 'Pepsi[50Cl]',
      salesId: '000078',
      category: 'Drinks',
      quantity: '2',
      price: '200',
      attendant: '',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(noProductId)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain attendant name');
        done();
      });
  });
});

// Test GET endpoint of sales
describe('API endpoint GET /sales', () => {
  it('Should return all sales record', (done) => {
    chai.request(server)
      .get('/api/v1/sales')
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.sales.should.be.an('array');
        res.body.should.have.property('success').eql(true);
        saleID = res.body.sales[0].id;
        res.body.sales[0].should.have.property('id');
        res.body.sales[0].should.have.property('product');
        res.body.sales[0].should.have.property('category');
        res.body.sales[0].should.have.property('price');
        res.body.sales[0].should.have.property('quantity');
        res.body.sales[0].should.have.property('attendant');
        res.body.should.have.property('message');
        res.body.message.should.eql('Request to get all sale records successfull');
        done();
      });
  });

  it('Should return specified sales order through its salesId', (done) => {
    chai.request(server)
      .get(`/api/v1/sales/${saleID}`)
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.sale.should.be.an('array');
        res.body.sale[0].should.have.property('id');
        res.body.sale[0].should.have.property('product');
        res.body.sale[0].should.have.property('category');
        res.body.sale[0].should.have.property('price');
        res.body.sale[0].should.have.property('quantity');
        res.body.sale[0].should.have.property('attendant');
        done();
      });
  });

  it('Should return Request to get specific sale record was not succesfull if sales ID does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/sales/1hj')
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request to get specific sale record was not succesfull');
        done();
      });
  });

  it('Should return Request to get record was not succesfull if product ID does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/sales/1hj')
      .set('Authorization', `beerer ${process.env.JWT_TEST_USER}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request to get specific sale record was not succesfull');
        done();
      });
  });
});

describe('API endpoint DELETE /sales', () => {
  it('Should return request was not succesfull, for invalid ID', (done) => {
    chai.request(server)
      .delete('/api/v1/sales/kjlkljl')
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(sale)
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
      .delete(`/api/v1/sales/${saleID}`)
      .set('Authorization', `beerer ${process.env.JWT_TEST_ADMIN}`)
      .send(sale)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Sale record deleted successfully');
        done();
      });
  });
});
