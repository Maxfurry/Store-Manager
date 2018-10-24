import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

process.env.NODE_ENV = 'test';

const should = chai.should();

chai.use(chaiHttp);

let saleID = '';

const sale = {
  product: 'Pepsi[50Cl]',
  salesId: '000078',
  category: 'Drinks',
  quantity: '2',
  price: '200',
  attendant: 'Adeniran Mark',
};

// Test GET endpoint of sales
describe('API endpoint GET /sales', () => {
  it('Should return all sales record', (done) => {
    chai.request(server)
      .get('/api/v1/sales')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.sales.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        Object.keys(res.body.sales).should.be.an('array');
        saleID = Object.keys(res.body.sales);
        res.body.sales[saleID[0]].should.have.property('product');
        res.body.sales[saleID[0]].should.have.property('salesId');
        res.body.sales[saleID[0]].should.have.property('category');
        res.body.sales[saleID[0]].should.have.property('price');
        res.body.sales[saleID[0]].should.have.property('quantity');
        res.body.sales[saleID[0]].should.have.property('attendant');
        done();
      });
  });

  it('Should return specified sales order through its salesId', (done) => {
    chai.request(server)
      .get(`/api/v1/sales/${saleID[0]}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.sales.should.be.an('object');
        res.body.sales.should.have.property('product');
        res.body.sales.should.have.property('salesId');
        res.body.sales.should.have.property('category');
        res.body.sales.should.have.property('price');
        res.body.sales.should.have.property('quantity');
        res.body.sales.should.have.property('attendant');
        done();
      });
  });

  it('Should return Request to get specific sale record was not succesfull if sales ID does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/sales/1hj')
      .then((res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request to get specific sale record was not succesfull');
        done();
      });
  });
});

//  Test POST endpoint of sale
describe('API endpoint POST /sales', () => {
  it('Should add sales order to file', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send(sale)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('sale').be.an('object');
        res.body.sale.should.have.property('product');
        res.body.sale.should.have.property('salesId');
        res.body.sale.should.have.property('category');
        res.body.sale.should.have.property('price');
        res.body.sale.should.have.property('quantity');
        res.body.sale.should.have.property('attendant');
        res.body.should.have.property('message').eql('Sale record created successfully');
        done();
      });
  });

  it('Should return Sale record already exist if salesId exist', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send(sale)
      .then((res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Sale record already exist');
        done();
      });
  });

  it('Should return Request must contain category if there is no category', (done) => {
    const noCat = {
      product: 'Pepsi[50Cl]',
      salesId: '000078',
      category: '',
      quantity: '2',
      price: '200',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
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
      product: 'Pepsi[50Cl]',
      salesId: '000078',
      category: 'Drinks',
      quantity: '2',
      price: '',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .send(noPrice)
      .then((res) => {
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
      salesId: '000078',
      category: 'Drinks',
      quantity: '2',
      price: 'aa',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
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
      product: 'Pepsi[50Cl]',
      salesId: '000078',
      category: 'Drinks',
      quantity: '',
      price: '200',
      attendant: 'Adeniran Mark'
    };

    chai.request(server)
      .post('/api/v1/sales')
      .send(noQuantity)
      .then((res) => {
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
      .send(letterQuantity)
      .then((res) => {
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
      product: '',
      salesId: '000078',
      category: 'Drinks',
      quantity: '2',
      price: '200',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .send(noName)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain product name');
        done();
      });
  });

  it('Should return Request must contain salesId if there is no salesId', (done) => {
    const noProductId = {
      product: 'Pepsi[50Cl]',
      salesId: '',
      category: 'Drinks',
      quantity: '2',
      price: '200',
      attendant: 'Adeniran Mark',
    };

    chai.request(server)
      .post('/api/v1/sales')
      .send(noProductId)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain salesId');
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
      .send(noProductId)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Request must contain attendant name');
        done();
      });
  });
});

describe('API endpoint DELETE /sales', () => {
  it('Should delete data from file', (done) => {
    chai.request(server)
      .delete('/api/v1/sales')
      .send(sale)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('saleRecord').be.an('object');
        res.body.saleRecord.should.have.property('product');
        res.body.saleRecord.should.have.property('salesId');
        res.body.saleRecord.should.have.property('category');
        res.body.saleRecord.should.have.property('price');
        res.body.saleRecord.should.have.property('quantity');
        res.body.saleRecord.should.have.property('attendant');
        res.body.should.have.property('message').eql('Sale record deleted successfully');
        done();
      });
  });
});
